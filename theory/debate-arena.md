# ⚔️ Báo cáo Kỹ thuật: Đấu trường Lập luận (Debate Arena)

**Đấu trường Lập luận** là tính năng cốt lõi và phức tạp nhất của dự án, nơi sinh viên trực tiếp cọ xát kiến thức Triết học Mác - Lênin với Trí tuệ Nhân tạo (Google Gemini API). Tài liệu này trình bày chi tiết về luồng hoạt động, cấu trúc Prompt và thuật toán Bảng xếp hạng.

---

## 1. Luồng hoạt động (Workflow)

1. **Khởi tạo:** Hệ thống lấy câu hỏi từ kho dữ liệu (file `debateData.ts`). Mỗi vòng, AI đóng vai một "Người phản biện" đưa ra các luận điểm sai lệch, phiến diện về Nguồn gốc và Bản chất của Nhà nước.
2. **Tương tác:** Sinh viên có **5 phút** để nhập câu trả lời. Yêu cầu vận dụng lý luận Mác - Lênin để bẻ gãy luận điểm của AI.
3. **Đánh giá (Serverless API):** Câu trả lời của sinh viên được gửi lên Vercel Serverless Function (`api/judge.js`). Tại đây, server giao tiếp với **Google Gemini API** bằng một Prompt được thiết kế chuyên biệt.
4. **Trả kết quả:** AI phân tích và trả về điểm số (tối đa 30đ/câu) kèm theo nhận xét chi tiết.
5. **Cập nhật Bảng xếp hạng:** Server tự động cập nhật điểm lên Redis (Upstash) và trả kết quả hiển thị cho người dùng.

---

## 2. Tiêu chí Chấm điểm & Cấu trúc Prompt (Prompt Engineering)

Hệ thống sử dụng Kỹ thuật Prompt (Prompt Engineering) để "ép" AI đóng vai một Giảng viên Triết học khó tính. Khung chấm điểm (Rubric) được lập trình sẵn và ép buộc AI trả về định dạng JSON nghiêm ngặt.

### 3 Tiêu chí cốt lõi (Tối đa 30 điểm/vòng):
- **Lý luận (10 điểm):** Đánh giá mức độ hiểu đúng bản chất vấn đề (Ví dụ: Hiểu rõ nhà nước là công cụ thống trị giai cấp).
- **Trích dẫn (10 điểm):** Đánh giá khả năng bám sát tài liệu tham khảo được cung cấp ngầm (`source_chunk`), từ khóa chuyên ngành.
- **Logic (10 điểm):** Đánh giá tính mạch lạc, lập luận chặt chẽ, sức thuyết phục của câu văn.

### Trích đoạn Prompt cấu hình AI:
```text
Bạn là một Giảng viên Triết học Mác - Lênin xuất sắc. 
Nhiệm vụ của bạn là chấm điểm câu trả lời của sinh viên dựa trên luận điểm sai lệch ban đầu.

Yêu cầu định dạng bắt buộc (JSON):
{
  "scores": {
    "ly_luan": <0-10>,
    "trich_dan": <0-10>,
    "logic": <0-10>
  },
  "feedback": "Nhận xét chi tiết tại sao sinh viên mất điểm, cần bổ sung ý gì.",
  "next_claim": "Luận điểm phản biện lại câu trả lời của sinh viên (nếu có)."
}
```

---

## 3. Thuật toán Bảng xếp hạng & Chống Gian lận (Anti-Cheat Leaderboard)

Để đảm bảo tính công bằng tuyệt đối khi thi đấu trên lớp, hệ thống Bảng xếp hạng được thiết kế tối ưu bằng **Upstash Redis**.

### Cấu trúc Dữ liệu:
- **Redis Hash (Kỷ lục cá nhân):** `mln_user_scores:<MSSV>`
  - Lưu lại điểm cao nhất sinh viên đạt được ở từng câu (Ví dụ: `round_0: 25`, `round_1: 30`).
- **Redis Sorted Set (Bảng xếp hạng tổng):** `mln_leaderboard`
  - Sắp xếp và lưu trữ tổng điểm của toàn bộ sinh viên trong lớp theo thứ tự giảm dần.

### Thuật toán Cập nhật Điểm (Real-time):
Khi sinh viên hoàn thành một câu hỏi, điểm số mới (`new_score`) sẽ được gửi lên Backend:
1. Backend dùng lệnh `HGET` để lấy kỷ lục cũ (`old_score`) của sinh viên tại câu hỏi đó.
2. So sánh:
   - Nếu `new_score <= old_score`: **Bỏ qua.** (Chống hành vi làm lại nhiều lần để cộng dồn điểm).
   - Nếu `new_score > old_score`: 
     - Dùng `HSET` để cập nhật kỷ lục mới.
     - Dùng `ZINCRBY` để cộng phần điểm chênh lệch (`new_score - old_score`) vào Bảng xếp hạng tổng.

### Ưu điểm:
- **Ngăn chặn Farm điểm:** Sinh viên không thể cày điểm bằng cách F5 trình duyệt hoặc làm đi làm lại câu dễ.
- **Merge (Gộp) Điểm thông minh:** Nếu mạng rớt, sinh viên vào lại bằng MSSV cũ, hệ thống vẫn nhận diện và cộng tiếp điểm mà không làm mất kỷ lục các câu đã làm.
- **Cập nhật thời gian thực:** Điểm số được bắn thẳng lên Dashboard ngay sau từng câu hỏi, tạo không khí cạnh tranh kịch tính khi thuyết trình trên lớp.
