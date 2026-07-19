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
    const { claim, user_answer, expected_points, source_chunk } = body;

    if (!claim || !user_answer || !expected_points || !source_chunk) {
      res.status(400).json({ error: 'Thiếu dữ liệu đầu vào' });
      return;
    }

    const SYSTEM_PROMPT = `Bạn là giảng viên Kinh tế Chính trị Mác-Lênin cực kỳ nghiêm khắc, đang chấm điểm sinh viên.
Nhiệm vụ: Chấm câu trả lời của sinh viên trên thang 0-10 cho 3 tiêu chí: [ly_luan, trich_dan, logic].
CHỈ dựa vào TÀI LIỆU GỐC được cung cấp dưới đây, tuyệt đối không thêm kiến thức ngoài.

Tiêu chí:
- ly_luan (0-10): Bám sát các khái niệm, trụ cột, tính tất yếu của hội nhập kinh tế quốc tế.
- trich_dan (0-10): Dẫn chứng đúng nội dung tài liệu (số liệu, mốc thời gian, tên hiệp định như WTO, CPTPP, v.v.).
- logic (0-10): Lập luận mạch lạc nhân-quả, đập tan được sự phiến diện của luận điểm đưa ra, không ngụy biện.

So sánh câu trả lời với CÁC Ý KỲ VỌNG. Nếu thiếu ý nào, hãy chỉ ra thẳng thắn, trừ điểm nặng, tuyệt đối không nịnh nọt hoặc tự ý chấm lỏng tay.

Trả về 1 JSON duy nhất có cấu trúc:
{
  "scores": {
    "ly_luan": <number 0-10>,
    "trich_dan": <number 0-10>,
    "logic": <number 0-10>
  },
  "feedback": "Nhận xét chi tiết (chỉ ra chỗ thiếu sót, hoặc khen ngợi nếu thực sự xuất sắc).",
  "next_claim": "Tùy chọn: Nêu một phản đề phụ/vặn vẹo thêm dựa trên chỗ yếu nhất của họ (để trống nếu họ trả lời hoàn hảo)."
}

=== TÀI LIỆU GỐC (GROUNDING) ===
${source_chunk}

=== CÁC Ý KỲ VỌNG ===
${expected_points.map((p, i) => `${i + 1}. ${p}`).join('\n')}
`;

    const USER_PROMPT = `Luận điểm đưa ra: "${claim}"\n\nCâu trả lời của sinh viên: "${user_answer}"`;

    const payload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: USER_PROMPT }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    };

    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    let replyText = '';

    try {
      const upstream = await fetch(url, {
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
      console.warn("Gemini Judge Error, initiating Failover to Groq:", err.message);
      
      const groqKey = process.env.GROQ_API_KEY;
      if (!groqKey) {
        res.status(500).json({ error: 'Gemini lỗi và không có cấu hình GROQ_API_KEY để fallback' });
        return;
      }

      const groqMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: USER_PROMPT }
      ];
      
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
            temperature: 0.2,
            response_format: { type: "json_object" }
         })
      });
      
      if (!groqRes.ok) {
         res.status(500).json({ error: 'Cả hệ thống chấm điểm chính và dự phòng đều quá tải.' });
         return;
      }
      const groqData = await groqRes.json();
      replyText = groqData.choices?.[0]?.message?.content || '';
    }

    if (!replyText) {
      res.status(500).json({ error: 'Lỗi parse kết quả JSON' });
      return;
    }

    try {
      const jsonResult = JSON.parse(replyText);
      res.status(200).json(jsonResult);
    } catch (parseError) {
      res.status(500).json({ error: 'AI trả về định dạng không hợp lệ', raw: replyText });
    }

  } catch (error) {
    console.error('Lỗi API Judge:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}
