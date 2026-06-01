# Phụ lục: Báo cáo ứng dụng AI (AI Usage)

Báo cáo này được lập ra nhằm đáp ứng tiêu chí **"Ứng dụng AI có trách nhiệm – minh bạch – sáng tạo – liêm chính học thuật"** trong đồ án môn Triết học Mác - Lênin.

---

## 1. Cam kết Liêm chính Học thuật

Nhóm cam kết rằng **Trí tuệ nhân tạo (AI) chỉ đóng vai trò hỗ trợ kỹ thuật và thiết kế**, không thay thế quá trình tư duy, phân tích logic và biên soạn nội dung học thuật cốt lõi của nhóm. 
- Nhóm **không để AI làm thay hoàn toàn** bất kỳ hạng mục nội dung nào.
- Toàn bộ nội dung lý luận về Nhà nước đều do nhóm tự tổng hợp, sau đó sử dụng AI để hỗ trợ đưa lên nền tảng Web và thiết kế các tính năng tương tác (Game, Chatbot).
- Nhóm hoàn toàn chịu trách nhiệm về nội dung cuối cùng xuất hiện trên sản phẩm.

---

## 2. Tính Minh bạch: Công cụ, Prompt & Phân định nội dung

### 2.1. Công cụ AI sử dụng
| Công cụ AI | Mục đích sử dụng |
|---|---|
| **Claude 3.5 (Anthropic)** | Viết code giao diện (React, Tailwind CSS), thiết kế layout UI/UX cho trang web và các trò chơi. |
| **Gemini 3.1 Flash-Lite (Google)** | Xử lý logic Backend cho Chatbot (RAG) và API chấm điểm tự động cho Game "Đấu trường lập luận". |
| **Llama 3.1 8B (Groq)** | Hệ thống dự phòng (Failover) cho API chấm điểm và Chatbot khi Gemini quá tải. |

### 2.2. Phân định rõ Output của AI và Phần Nhóm biên soạn
| Hạng mục | Phần do Nhóm sinh viên thực hiện | Phần AI hỗ trợ (Output của AI) |
|---|---|---|
| **Lý thuyết Nhà nước** | Đọc giáo trình, chắt lọc kiến thức cốt lõi, viết nội dung text. | Format văn bản thành mã HTML/Markdown để hiển thị đẹp trên Web. |
| **Trò chơi Ôn tập (Timeline, Nối chữ)** | Xây dựng luật chơi, viết câu hỏi, cung cấp cặp khái niệm đáp án. | Lập trình logic kéo thả, bắt lỗi, tính điểm và tạo hiệu ứng chúc mừng (Confetti). |
| **Chatbot & Game "Đấu trường lập luận"** | Thiết kế bộ luật chấm (Rubric), soạn 3 câu hỏi tranh biện, cung cấp tài liệu RAG. | Đóng vai giám khảo (LLM), đọc tài liệu nhóm cung cấp để chấm điểm người chơi trực tiếp. |
| **Giao diện & Cấu trúc Web** | Đưa ra ý tưởng luồng trải nghiệm (Lý thuyết -> Game -> Tranh biện). | Viết code React/TypeScript tạo giao diện tương tác, tối ưu responsive cho di động. |

### 2.3. Các Prompt chính & Quá trình chỉnh sửa
| Mục đích | Prompt tiêu biểu nhóm đưa ra | Kết quả AI sinh ra | Phần sinh viên chỉnh sửa/Kiểm duyệt |
|---|---|---|---|
| **Tạo Game Phản biện** | *"Hãy viết một API chấm điểm dựa trên 3 tiêu chí: Lý luận, Trích dẫn, Logic. Chấm trên thang 10. Trả về định dạng JSON."* | API chấm điểm chung chung, thường có xu hướng "nịnh" người chơi. | Nhóm điều chỉnh System Prompt: *"Chỉ dựa vào TÀI LIỆU GỐC, nếu thiếu ý hãy trừ điểm nặng, tuyệt đối không nịnh nọt."* để ép AI chấm gắt hơn. |
| **Thiết lập Chatbot RAG** | *"Tạo cơ chế chỉ lấy 2 đoạn giáo trình liên quan nhất (chunking) để nhồi vào prompt thay vì đưa hết 7 trang."* | Thuật toán cắt văn bản và lọc từ khóa (Keyword matching). | Nhóm kiểm tra lại thuật toán, loại bỏ các hư từ (stop-words) tiếng Việt để AI tìm đoạn văn chính xác hơn. |
| **Responsive Web** | *"Điều chỉnh giao diện trang Lý thuyết để đọc dễ hơn trên màn hình điện thoại di động."* | CSS tự động thu nhỏ font và ẩn bớt ảnh. | Nhóm duyệt lại trên điện thoại thật, yêu cầu AI mở rộng lề (margin) và thêm nút Back to Top. |

---

## 3. Có Trách nhiệm: Kiểm chứng thông tin (Fact-checking)

Toàn bộ thông tin học thuật (kể cả phần do Chatbot AI sinh ra trong lúc tương tác với người dùng) đều được cấu trúc theo dạng **RAG (Retrieval-Augmented Generation)**. Nghĩa là AI không được phép tự "bịa" câu trả lời từ dữ liệu huấn luyện của nó, mà **bắt buộc phải trích xuất** từ nguồn tài liệu chuẩn do nhóm cung cấp.

Các nguồn tài liệu nhóm dùng để đối chiếu và nạp vào hệ thống kiểm chứng bao gồm:
1. **Giáo trình Triết học Mác - Lênin** (NXB Chính trị Quốc gia Sự thật, 2021) — *Nguồn gốc, bản chất, đặc trưng, chức năng nhà nước.*
2. Tác phẩm **Nhà nước và Cách mạng** (1917) của V.I. Lênin — *Dùng để đối chiếu các luận điểm về mâu thuẫn giai cấp.*
3. **Hiến pháp nước CHXHCN Việt Nam năm 2013** và **Văn kiện Đại hội XIII** — *Dùng để kiểm chứng thông tin về Nhà nước pháp quyền XHCN Việt Nam.*

* Bất kỳ câu trả lời nào của Chatbot đi chệch khỏi các tài liệu này đều được nhóm rà soát và tinh chỉnh lại bộ prompt giới hạn.

---

## 4. Ứng dụng Sáng tạo rõ ràng

AI không được dùng để "viết hộ bài luận", mà được nhóm tận dụng như một **công cụ khuếch đại tính sáng tạo và tính tương tác** của sản phẩm:

1. **Kiến trúc RAG Chatbot Nội bộ:** Thay vì dùng ChatGPT thông thường, nhóm đã tự lập trình một Chatbot tích hợp thẳng vào Website, nhúng sẵn dữ liệu Giáo trình Chương III để giải đáp thắc mắc cho bạn học 24/7.
2. **Hệ thống Game "Đấu trường lập luận":** Ứng dụng sáng tạo nhất của AI trong đồ án. Nhóm biến AI thành một "Giảng viên phản biện ảo". AI sẽ liên tục đưa ra các luận điểm hóc búa, yêu cầu người chơi phản biện lại bằng kiến thức Mác-Lênin, sau đó AI tự động chấm điểm trên 3 tiêu chí cốt lõi một cách minh bạch.
3. **Cơ chế Dự phòng (Failover) Chuyên nghiệp:** Nhóm ứng dụng kỹ thuật gọi API song song (Gemini và Llama-Groq) để đảm bảo game và chatbot luôn mượt mà kể cả khi có nhiều bạn trong lớp truy cập cùng lúc lúc thuyết trình.

---
*Sản phẩm: Web app tương tác "Nhà nước và Cách mạng xã hội"*
*Phục vụ đánh giá thành phần "Ứng dụng AI sáng tạo, minh bạch, liêm chính" (20% điểm sản phẩm).*
