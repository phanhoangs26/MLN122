// Vercel Serverless Function: relay tới Google Gemini, giữ API key ở phía server.
// Đọc GEMINI_API_KEY từ Environment Variables của Vercel (không lộ ra client).
// Đọc GROQ_API_KEY từ Environment Variables của Vercel (không lộ ra client) để fallback.

import { FULL_TEXTBOOK } from './textbook.js';

const DEFAULT_MODEL = 'gemini-1.5-flash';

function retrieveRelevantContext(query, fullText) {
  // Cắt thành các chunk theo tiêu đề
  const chunks = fullText.split(/\n(?=[A-Z0-9])/);
  
  const stopwords = ['của', 'là', 'có', 'trong', 'với', 'và', 'các', 'những', 'để', 'cho', 'về', 'được', 'không', 'như', 'tại', 'sao', 'thế', 'nào', 'gì', 'ai'];
  const qTokens = query.toLowerCase().normalize('NFC')
    .replace(/[.,?!;:()"'’]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopwords.includes(t));

  if (qTokens.length === 0) return chunks[0] || '';

  let bestChunks = [];
  for (const chunk of chunks) {
    const chunkTokens = chunk.toLowerCase().normalize('NFC');
    let score = 0;
    for (const token of qTokens) {
      const regex = new RegExp(`(?<=\\s|^)${token}(?=\\s|$)`, 'g');
      const matches = chunkTokens.match(regex);
      if (matches) score += matches.length;
    }
    bestChunks.push({ chunk, score });
  }

  // Sort theo score giảm dần
  bestChunks.sort((a, b) => b.score - a.score);
  
  // Lấy top 2 chunk
  return bestChunks.slice(0, 2).map(c => c.chunk).join('\n\n...\n\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server thiếu GEMINI_API_KEY' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { contents, model, kbContext, mode } = body;

    if (!Array.isArray(contents) || contents.length === 0) {
      res.status(400).json({ error: 'Thiếu contents' });
      return;
    }

    const QA_PROMPT = `Bạn là trợ lý học tập môn Kinh tế Chính trị Mác-Lênin, chủ đề "Hội nhập kinh tế quốc tế của Việt Nam".
Nhiệm vụ: Trả lời bám sát tài liệu giáo trình, không tự bịa kiến thức ngoài ngữ cảnh.
- Trả lời ngắn gọn, rõ ràng, dễ hiểu.
- Nằm ngoài chủ đề Hội nhập kinh tế quốc tế thì từ chối: "Nội dung này nằm ngoài phạm vi kiến thức."`;

    const BEHAVIORAL_PROMPT = QA_PROMPT;

    // Lấy câu hỏi cuối cùng của user để retrieve
    const lastUserQuery = contents.filter(c => c.role === 'user').pop()?.parts?.[0]?.text || '';
    const retrievedContext = retrieveRelevantContext(lastUserQuery, FULL_TEXTBOOK);

    const RAG_INSTRUCTION = kbContext 
      ? `\n\n=== TÀI LIỆU RAG TỪ LOCAL KB (BẮT BUỘC SỬ DỤNG LÀM NỀN TẢNG) ===\nDưới đây là thông tin được trích xuất từ cơ sở dữ liệu nội bộ:\n${kbContext}\n=====================================`
      : '';

    const systemPrompt = `${BEHAVIORAL_PROMPT}\n\n=== GIÁO TRÌNH RAG (TOP MỤC LIÊN QUAN) ===\n${retrievedContext}${RAG_INSTRUCTION}`;

    const payload = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: contents,
      generationConfig: { temperature: 0.3 },
    };

    let replyText = '';
    const m = model || DEFAULT_MODEL;
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const upstream = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!upstream.ok) {
        throw new Error(`Gemini failed with status: ${upstream.status}`);
      }
      
      const data = await upstream.json();
      replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (err) {
      console.warn("Gemini Error, initiating Failover to Groq:", err.message);
      
      const groqKey = process.env.GROQ_API_KEY;
      if (!groqKey) {
        res.status(500).json({ error: 'Gemini lỗi và không có cấu hình GROQ_API_KEY để fallback' });
        return;
      }

      // Ánh xạ sang chuẩn OpenAI của Groq
      const groqMessages = [{ role: 'system', content: systemPrompt }];
      contents.forEach(c => {
         groqMessages.push({ 
           role: c.role === 'model' ? 'assistant' : 'user', 
           content: c.parts[0].text 
         });
      });
      
      const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';
      const groqRes = await fetch(groqUrl, {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
         },
         body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: groqMessages,
            temperature: 0.3
         })
      });
      
      if (!groqRes.ok) {
         res.status(500).json({ error: 'Cả hệ thống Gemini (Primary) và Groq (Failover) đều từ chối yêu cầu.' });
         return;
      }
      const groqData = await groqRes.json();
      replyText = groqData.choices?.[0]?.message?.content || '';
    }

    if (!replyText) {
      res.status(500).json({ error: 'Không nhận được câu trả lời từ bất kỳ AI nào.' });
      return;
    }

    res.status(200).json({ text: replyText });
  } catch (error) {
    console.error('Lỗi xử lý chat:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}
