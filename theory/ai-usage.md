# Phụ lục: Ứng dụng AI trong sản phẩm

## Cam kết liêm chính học thuật

Nhóm cam kết rằng AI chỉ đóng vai trò **hỗ trợ kỹ thuật và thiết kế**, không thay thế quá trình tư duy, phân tích và biên soạn nội dung học thuật của nhóm. Toàn bộ nội dung lý thuyết được đối chiếu với Giáo trình Triết học Mác–Lênin (NXB Chính trị Quốc gia, 2021) và các văn bản chính thống trước khi đưa vào sản phẩm.

---

## Công cụ AI sử dụng

| Công cụ | Mục đích |
|---|---|
| Claude (Anthropic) | Thiết kế giao diện, lập trình React/TypeScript, điều chỉnh UI/UX |
| Gemini (Google) | Chatbot hỏi đáp tích hợp trong web (serverless function `/api/chat`) |

---

## Phân định: AI output vs. nhóm biên soạn

### Phần do AI hỗ trợ (kỹ thuật)

| Hạng mục | Mô tả |
|---|---|
| Toàn bộ source code | React + TypeScript + Tailwind CSS — được tạo và điều chỉnh qua prompt |
| Thiết kế UI | Layout, typography, màu sắc, responsive mobile — thiết kế qua mô tả yêu cầu bằng ngôn ngữ tự nhiên |
| Cấu trúc mini-game | Logic game Timeline, Matching, hệ thống XP — được lập trình theo đặc tả của nhóm |
| Chatbot backend | System prompt + RAG knowledge base — nhóm viết nội dung, AI giúp tích hợp kỹ thuật |

### Prompt tiêu biểu

| Prompt nhóm đưa ra | Kết quả AI tạo ra | Nhóm chỉnh sửa |
|---|---|---|
| "Điều chỉnh responsive để cải thiện UI dùng trên mobile" | CSS breakpoint và layout tự động co giãn | Kiểm tra thực tế trên điện thoại, phát hiện overflow và yêu cầu fix cụ thể từng lỗi |
| "Nhúng những link Wikipedia sau vào các phần liệt kê tương ứng trong trang nhà nước tư sản" | Thêm href vào các card quốc gia | Kiểm tra link đúng quốc gia, bổ sung rel="noopener noreferrer" |
| "Thay vì chọn 1 lần 10 thẻ thì chọn từng thẻ, phản hồi ngay mỗi thẻ đúng/sai" | Logic game per-card validation với flash đỏ | Điều chỉnh timing (500ms), thông báo ngôn ngữ tiếng Việt |
| "Cập nhật câu hỏi ôn tập cho sát giáo trình Mác–Lênin hơn" | Bản nháp câu hỏi và đáp án | Đối chiếu từng câu với giáo trình, sửa thuật ngữ và bổ sung trích dẫn |

### Phần do nhóm tự thực hiện

| Hạng mục | Mô tả |
|---|---|
| **Ý tưởng sản phẩm** | Concept web app ôn tập và cấu trúc học tập (lý thuyết → game → chatbot → vận dụng thực tiễn) do nhóm đề xuất. AI chỉ hỗ trợ hiện thực hóa bằng mã nguồn và giao diện. |
| **Nội dung lý thuyết** | Đọc giáo trình, chọn lọc, biên soạn lại toàn bộ 9 phần lý luận nhà nước |
| **Câu hỏi ôn tập** | Nhóm xác định trọng tâm, AI đề xuất bản nháp, nhóm đối chiếu và chỉnh sửa từng câu theo giáo trình |
| **Dữ liệu game** | Các cặp nối khái niệm, thứ tự timeline — nhóm quyết định và kiểm chứng |
| **Nội dung trang Việt Nam** | Nghiên cứu Đại hội XIV, Hiến pháp 2013, Nghị quyết Trung ương — nhóm tổng hợp |
| **Luận giải trung tâm** | Phân tích 3 tầng lập luận từ luận điểm Lênin → thực tiễn — nhóm viết |

### AI đề xuất → Nhóm chỉnh sửa

| AI đề xuất ban đầu | Nhóm chỉnh sửa |
|---|---|
| Giao diện nhiều màu sắc theo template mặc định | Chuyển sang palette đỏ–trắng–đen thống nhất theo phong cách báo chí nghiêm túc |
| Chatbot trả lời mọi câu hỏi chung về triết học | Giới hạn bằng knowledge base riêng, bám sát nội dung giáo trình Chương III |
| Timeline game cho phép đặt tất cả thẻ rồi mới kiểm tra | Đổi thành chọn từng thẻ với phản hồi ngay lập tức, tăng tính tương tác |
| Thứ tự game Nối khái niệm ngẫu nhiên | Sắp xếp lại theo độ khó tăng dần: đặc trưng → chức năng → kiểu nhà nước → quan hệ biện chứng |

---

## Kiểm chứng thông tin

Các nội dung do AI đề xuất được đối chiếu với:

- **Giáo trình Triết học Mác–Lênin** (NXB Chính trị Quốc gia Sự thật, 2021) — nguồn chính
- **Hiến pháp nước CHXHCN Việt Nam 2013**
- **Văn kiện Đại hội XIII, XIV** của Đảng Cộng sản Việt Nam
- **Tác phẩm gốc:** V.I. Lênin, *Nhà nước và Cách mạng* (1917); Ph. Ăngghen, *Nguồn gốc của gia đình, của chế độ tư hữu và của nhà nước*

Những nội dung AI đề xuất sai so với giáo trình đã được **sửa hoặc loại bỏ** trước khi đưa vào web.

---

## Phần AI hỗ trợ sáng tạo rõ ràng

1. **Hệ thống XP và game hóa** — ý tưởng của nhóm, AI triển khai kỹ thuật (Zustand store, confetti animation)
2. **Chatbot bám sát giáo trình** — nhóm thiết kế knowledge base, AI tích hợp Gemini API
3. **Responsive mobile** — nhóm phát hiện lỗi qua testing thực tế, AI sửa CSS/Tailwind theo yêu cầu cụ thể
4. **Timeline game per-card** — nhóm thiết kế luồng tương tác, AI lập trình logic validation

---

*Sản phẩm: Web app ôn tập "Chuyên đề Nhà nước — Triết học Mác–Lênin"*  
*Môn học: Triết học Mác–Lênin | Học kỳ 2025–2026*
