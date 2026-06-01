// Vercel Serverless Function: relay tới Google Gemini, giữ API key ở phía server.
// Đọc GEMINI_API_KEY từ Environment Variables của Vercel (không lộ ra client).

import { FULL_TEXTBOOK } from './textbook.js';

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

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

    const QA_PROMPT = `Bạn là trợ lý học tập môn Triết học Mác - Lênin.
Nhiệm vụ: Trả lời bám sát tài liệu giáo trình, không tự bịa kiến thức ngoài ngữ cảnh.
- Giải thích logic nhân quả ngắn gọn, dễ hiểu.
- Phản hồi siêu tốc, không lan man.
- Nằm ngoài Chương III thì từ chối: "Nội dung này nằm ngoài phạm vi kiến thức."`;

    const DEBATE_PROMPT = `Bạn là giảng viên Triết học Mác - Lênin đóng vai người chất vấn.
Nhiệm vụ: Đóng vai người phản biện gắt gao. Nêu phản đề, đặt câu hỏi đào sâu, lật ngược vấn đề để ép sinh viên tư duy.
- Nếu sinh viên trả lời đúng, hãy đưa ra ví dụ hóc búa (vd: phúc lợi xã hội ở nước tư bản, tính trung lập của nhà nước) để thử thách.
- Phải dựa trên tài liệu gốc, không bịa đặt kiến thức, luôn quy về nền tảng: Tư hữu -> Giai cấp -> Mâu thuẫn không thể điều hòa -> Nhà nước.
- Hãy dùng giọng văn sắc sảo, gợi mở, luôn kết thúc bằng một câu hỏi chất vấn.`;

    const BEHAVIORAL_PROMPT = mode === 'debate' ? DEBATE_PROMPT : QA_PROMPT;

    const RAG_INSTRUCTION = kbContext 
      ? `\n\n=== TÀI LIỆU RAG TỪ LOCAL KB (BẮT BUỘC SỬ DỤNG LÀM NỀN TẢNG) ===\nDưới đây là thông tin được trích xuất từ cơ sở dữ liệu nội bộ. Hãy ưu tiên sử dụng thông tin này để củng cố lập luận:\n${kbContext}\n=====================================`
      : '';

    const systemPrompt = `${BEHAVIORAL_PROMPT}\n\n=== GIÁO TRÌNH GỐC (FULL TEXTBOOK) ===\n${FULL_TEXTBOOK}${RAG_INSTRUCTION}`;

    const m = model || DEFAULT_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 800, temperature: 0.3 },
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.error?.message || 'Lỗi gọi Gemini' });
      return;
    }

    const text = (data?.candidates?.[0]?.content?.parts || []).map((p) => p?.text || '').join('');
    if (!text.trim()) {
      res.status(502).json({ error: 'Phản hồi rỗng từ Gemini' });
      return;
    }

    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Lỗi không xác định' });
  }
}
