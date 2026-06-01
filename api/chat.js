// Vercel Serverless Function: relay tới Google Gemini, giữ API key ở phía server.
// Đọc GEMINI_API_KEY từ Environment Variables của Vercel (không lộ ra client).

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

// Nội dung giáo trình bám sát Chương III — làm system context cho API
const TEXTBOOK_CONTEXT = `
GIÁO TRÌNH TRIẾT HỌC MÁC - LÊNIN 2021 — Chương III: Nhà nước và Cách mạng xã hội

=== NGUỒN GỐC NHÀ NƯỚC ===
Ph. Ăngghen: "Nhà nước là sản phẩm của một xã hội đã phát triển tới một giai đoạn nhất định" khi "xã hội đó đã bị phân thành những mặt đối lập không thể điều hòa mà xã hội đó bất lực không sao loại bỏ được."
Trong xã hội nguyên thủy chưa có nhà nước — xã hội tự quản theo thị tộc, bộ lạc, chưa có tư hữu, chưa phân chia giai cấp.
Nguyên nhân sâu xa: lực lượng sản xuất phát triển → của cải dư thừa → chế độ tư hữu → phân hóa giai cấp.
Nguyên nhân trực tiếp: mâu thuẫn giai cấp gay gắt không thể điều hòa.
V.I. Lênin: "bất cứ ở đâu, hễ lúc nào và chừng nào mà, về mặt khách quan, những mâu thuẫn giai cấp không thể điều hòa được, thì nhà nước xuất hiện. Và ngược lại: sự tồn tại của nhà nước chứng tỏ rằng những mâu thuẫn giai cấp là không thể điều hòa được."

=== BẢN CHẤT NHÀ NƯỚC ===
Nhà nước là tổ chức chính trị của giai cấp thống trị về kinh tế, nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng của các giai cấp khác.
Ph. Ăngghen: nhà nước "chẳng qua chỉ là một bộ máy của một giai cấp này dùng để trấn áp một giai cấp khác."
V.I. Lênin: "Theo Mác, nhà nước là một cơ quan thống trị giai cấp, là một cơ quan áp bức của một giai cấp này đối với một giai cấp khác."
Không có nhà nước đứng trên hoặc đứng ngoài giai cấp.
Ngoại lệ: khi đấu tranh giai cấp đạt thế cân bằng, nhà nước có thể giữ độc lập tương đối với cả hai giai cấp (Ph. Ăngghen).

=== BA ĐẶC TRƯNG CƠ BẢN (theo Lênin/Ăngghen) ===
1. Quản lý cư dân theo lãnh thổ: phân chia dân cư theo đơn vị lãnh thổ, hình thành biên giới quốc gia. Quyền lực nhà nước có hiệu lực với tất cả thành viên trong phạm vi biên giới.
2. Hệ thống cơ quan quyền lực cưỡng chế chuyên nghiệp: "những đội vũ trang đặc biệt" — quân đội, cảnh sát, tòa án, nhà tù, bộ máy hành chính — buộc mọi thành viên phục tùng ý chí giai cấp cầm quyền.
3. Thuế khóa: Ph. Ăngghen: "muốn duy trì quyền lực công cộng đó, cần phải có sự đóng góp của công dân, đó là thuế má."

=== CHỨC NĂNG NHÀ NƯỚC ===
- Chức năng thống trị chính trị (chủ đạo): dùng bộ máy quyền lực duy trì sự thống trị giai cấp.
- Chức năng xã hội: quản lý công việc chung (thủy lợi, giao thông, y tế, giáo dục...). Ph. Ăngghen: "chức năng xã hội là cơ sở của sự thống trị chính trị."
- Chức năng đối nội: thực hiện đường lối đối nội, duy trì trật tự xã hội.
- Chức năng đối ngoại: quan hệ với các nhà nước khác, bảo vệ lãnh thổ, lợi ích quốc gia.

=== CÁC KIỂU NHÀ NƯỚC ===
Bốn kiểu trong lịch sử:
1. Nhà nước chủ nô: giai cấp chủ nô thống trị. Hình thức: quân chủ chủ nô (Xpác) và cộng hòa dân chủ chủ nô (Aten).
2. Nhà nước phong kiến: địa chủ, phong kiến thống trị. Hình thức: tập quyền (vua có quyền tuyệt đối) và phân quyền (cát cứ địa phương).
3. Nhà nước tư sản: giai cấp tư sản thống trị. Hình thức: cộng hòa đại nghị, tổng thống, quân chủ lập hiến... V.I. Lênin: "thực chất chỉ là một: nền chuyên chính tư sản."
4. Nhà nước vô sản/XHCN: kiểu "đặc biệt" — nhà nước của số đông thống trị số ít. Ví dụ: Công xã Pari (1871), Xôviết (1917), VNDCCH, CHXHCNVN, CHND Trung Hoa.

=== NHÀ NƯỚC VÔ SẢN & TIÊU VONG ===
C. Mác: nhà nước thời kỳ quá độ là "nền chuyên chính cách mạng của giai cấp vô sản."
Hai chức năng cơ bản: (1) tổ chức xây dựng trật tự kinh tế - xã hội mới; (2) trấn áp sự phản kháng của các thế lực chống đối.
V.I. Lênin: nhiệm vụ hàng đầu là "phát triển dân chủ đến cùng."
Khi xã hội đạt giai đoạn cộng sản chủ nghĩa, không còn giai cấp, xã hội vận hành theo nguyên tắc "tự giác" → nhà nước "tự tiêu vong."

=== NHÀ NƯỚC VIỆT NAM ===
Lịch sử: phong kiến tập quyền/phân quyền (thế kỷ X–XIX) → thuộc địa nửa phong kiến (1884–1945) → VNDCCH sau Cách mạng Tháng Tám 1945.
Hiện nay: Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân.
Nguyên tắc: "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ."
Đại hội XII: "Nước CHXHCNVN do nhân dân làm chủ; tất cả quyền lực nhà nước thuộc về nhân dân, nền tảng là liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức."
Đại hội XIII: hoàn thiện mô hình, phân công lập pháp–hành pháp–tư pháp, kiểm soát quyền lực nhà nước, giải quyết quan hệ Nhà nước–thị trường–xã hội.
Đại hội XIV (2026): tiếp tục xây dựng nhà nước kiến tạo, chính phủ liêm chính, hành động, phục vụ; đẩy mạnh chuyển đổi số, sắp xếp bộ máy hành chính tinh gọn, hiệu lực, hiệu quả.
Mục tiêu: dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
`;

import { pipeline } from '@huggingface/transformers';

let generator = null;

export async function getModel() {
  if (!generator) {
    generator = await pipeline(
      'text-generation',
      'Qwen/Qwen3-0.6B'
    );
  }
  return generator;
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

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { contents, model } = body;

    if (!Array.isArray(contents) || contents.length === 0) {
      res.status(400).json({ error: 'Thiếu contents' });
      return;
    }

    const BEHAVIORAL_PROMPT = `Bạn là chatbot học tập chuyên về Chương III:
"Nhà nước và Cách mạng xã hội"
của Giáo trình Triết học Mác – Lênin.

Nhiệm vụ:
- Trả lời dựa trên TEXTBOOK_CONTEXT được cung cấp.
- Không tự bịa kiến thức ngoài giáo trình.
- Ưu tiên giải thích logic nhân quả thay vì chép nguyên văn.
- Trả lời ngắn gọn trước, chi tiết khi người dùng yêu cầu.
- Nếu câu hỏi liên quan đến nhận định của Lênin:
  "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được"
  thì luôn phân tích theo chuỗi:
  lực lượng sản xuất → tư hữu → phân hóa giai cấp → mâu thuẫn giai cấp → nhà nước ra đời
- Khi phù hợp, liên hệ Việt Nam hiện nay.
- Nếu câu hỏi nằm ngoài Chương III, hãy nói:
  "Nội dung này nằm ngoài phạm vi kiến thức của chatbot."

Phong cách:
- Dễ hiểu, học thuật, không lan man, có ví dụ minh họa khi cần.

Yêu cầu đặc biệt về phản biện:
Sau mỗi câu trả lời học thuật, nếu phù hợp hãy thêm:
"**Câu hỏi mở rộng:**"
và đặt một câu hỏi ngắn giúp người học suy nghĩ thêm.

Yêu cầu về luận điểm trung tâm:
Nếu người dùng hỏi về:
- nguồn gốc nhà nước
- bản chất nhà nước
- đặc trưng nhà nước
- chức năng nhà nước
- nhà nước vô sản
- nhà nước Việt Nam
thì luôn giải thích mối liên hệ của nội dung đó với nhận định của Lênin:
"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được."`;

    const systemPrompt = `${BEHAVIORAL_PROMPT}\n\n=== TEXTBOOK_CONTEXT ===\n${TEXTBOOK_CONTEXT}`;

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
      throw new Error(data?.error?.message || 'Lỗi gọi Gemini');
    }

    const text = (data?.candidates?.[0]?.content?.parts || []).map((p) => p?.text || '').join('');
    if (!text.trim()) {
      throw new Error('Phản hồi rỗng từ Gemini');
    }

    res.status(200).json({ text });
  } catch (err) {
    try {
      // Gọi Qwen Local Fallback
      const gen = await getModel();
      const userMessages = body?.contents?.filter(c => c.role === 'user') || [];
      const lastUserMsg = userMessages[userMessages.length - 1]?.parts?.[0]?.text || '';
      
      const prompt = `Bạn là Trợ lý Triết học Mác - Lênin.\nNgười dùng hỏi: ${lastUserMsg}\nTrả lời:`;
      const result = await gen(prompt, { max_new_tokens: 300 });
      
      let text = result[0].generated_text;
      if (text.startsWith(prompt)) {
        text = text.slice(prompt.length).trim();
      }

      res.status(200).json({ text: text + '\n\n_(Đã dùng Qwen fallback do API lỗi)_' });
    } catch (fallbackErr) {
      res.status(500).json({ error: err?.message || 'Lỗi không xác định' });
    }
  }
}
