// Vercel Serverless Function: relay tới Google Gemini, giữ API key ở phía server.
// Đọc GEMINI_API_KEY từ Environment Variables của Vercel (không lộ ra client).

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

// Nội dung giáo trình bám sát Chương III — làm system context cho API
const TEXTBOOK_CONTEXT = `
CHƯƠNG III: NHÀ NƯỚC VÀ CÁCH MẠNG XÃ HỘI
- Nguồn gốc nhà nước: Là sản phẩm của xã hội phân chia giai cấp. Nguyên nhân sâu xa: lực lượng sản xuất phát triển → tư hữu. Nguyên nhân trực tiếp: mâu thuẫn giai cấp không thể điều hòa (Theo Lênin). Xã hội nguyên thủy chưa có nhà nước.
- Bản chất nhà nước: Tổ chức chính trị của giai cấp thống trị về kinh tế, dùng để trấn áp giai cấp khác. Không có nhà nước đứng ngoài giai cấp.
- Đặc trưng: (1) Quản lý cư dân theo lãnh thổ; (2) Có bộ máy cưỡng chế chuyên nghiệp (quân đội, cảnh sát, nhà tù...); (3) Thu thuế.
- Chức năng: Thống trị chính trị (bảo vệ lợi ích giai cấp cầm quyền) và chức năng xã hội (quản lý công việc chung).
- Các kiểu nhà nước: Chủ nô, phong kiến, tư sản (đều là bóc lột) và vô sản/XHCN (nhà nước của số đông, bảo vệ đa số).
- Nhà nước tiêu vong: Khi đạt đến cộng sản chủ nghĩa, không còn giai cấp thì nhà nước tự tiêu vong.
- Nhà nước Việt Nam: Là Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân. Do Đảng lãnh đạo. Tất cả quyền lực thuộc về Nhân dân.
`;

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
    const { contents, model, kbContext } = body;

    if (!Array.isArray(contents) || contents.length === 0) {
      res.status(400).json({ error: 'Thiếu contents' });
      return;
    }

    const BEHAVIORAL_PROMPT = `Bạn là chatbot học tập Triết học Mác – Lênin (Chương III).
Nhiệm vụ:
- Trả lời đúng trọng tâm dựa vào TEXTBOOK_CONTEXT, không bịa kiến thức.
- Giải thích logic nhân quả ngắn gọn, dễ hiểu.
- Phản hồi siêu tốc, không lan man.
- Nằm ngoài Chương III thì từ chối: "Nội dung này nằm ngoài phạm vi kiến thức."
- Cuối câu trả lời, luôn thêm 1 mục "**Câu hỏi mở rộng:**" để gợi mở tư duy.`;

    const RAG_INSTRUCTION = kbContext 
      ? `\n\n=== TÀI LIỆU RAG TỪ LOCAL KB (BẮT BUỘC SỬ DỤNG) ===\nDưới đây là thông tin được trích xuất từ cơ sở dữ liệu nội bộ. Hãy sử dụng thông tin này làm cơ sở chính để trả lời người dùng, diễn đạt lại cho tự nhiên và thuyết phục:\n${kbContext}\n=====================================`
      : '';

    const systemPrompt = `${BEHAVIORAL_PROMPT}\n\n=== TEXTBOOK_CONTEXT ===\n${TEXTBOOK_CONTEXT}${RAG_INSTRUCTION}`;

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
