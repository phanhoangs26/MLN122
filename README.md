# 🎓 Dự án: Triết học Mác - Lênin (Interactive Learning Web)

Dự án Web tương tác ứng dụng Trí tuệ nhân tạo (AI) và Gamification để hỗ trợ sinh viên ôn tập và tìm hiểu sâu về bộ môn Triết học Mác - Lênin (Cụ thể: Nguồn gốc và bản chất của Nhà nước).

## 🌟 Tính năng nổi bật

1. **Thư viện Lý thuyết (Retro Style)** 📚
   - Trình bày kiến thức triết học dưới dạng thiết kế báo chí cổ điển (Vintage/Retro Newspaper).
   - Nội dung được biên soạn kỹ lưỡng, dễ đọc, dễ tiếp thu.

2. **Khởi động Trí tuệ (Minigames)** 🎮
   - **Dòng thời gian:** Sắp xếp các sự kiện lịch sử/triết học theo đúng trình tự.
   - **Nối khái niệm:** Nối các thuật ngữ triết học với định nghĩa chính xác.

3. **Đấu trường Lập luận (Debate AI)** ⚔️
   - Trò chơi cốt lõi của hệ thống.
   - AI (Google Gemini) sẽ đóng vai "Người phản biện", đưa ra những luận điểm sai lệch hoặc phiến diện về triết học Mác - Lênin.
   - Sinh viên có 5 phút để viết phản biện. Hệ thống AI sẽ tự động đọc, phân tích và chấm điểm dựa trên 3 tiêu chí: **Lý luận**, **Trích dẫn** và **Logic**.

4. **Bảng Xếp Hạng Danh Danh (Real-time Leaderboard)** 🏆
   - Hệ thống lưu trữ điểm số tự động bằng **Upstash Redis**.
   - Ghi nhận "Kỷ lục cá nhân" cho từng câu hỏi. Chỉ cộng phần điểm chênh lệch nếu sinh viên phá kỷ lục cũ của chính mình.
   - Ngăn chặn triệt để hành vi cày điểm lặp lại (spam), đảm bảo công bằng.
   - Xếp hạng sinh viên toàn lớp theo thời gian thực (Real-time).

5. **Trợ lý AI (Chatbot 24/7)** 🤖
   - Giải đáp mọi thắc mắc về Triết học Mác - Lênin.
   - Cung cấp nguồn trích dẫn và ví dụ thực tiễn.

## 🛠 Công nghệ sử dụng
- **Frontend:** React, Vite, TailwindCSS v4, Framer Motion (hiệu ứng mượt mà).
- **Backend/API:** Vercel Serverless Functions.
- **Database:** Upstash Redis (Serverless KV store) xử lý Leaderboard.
- **AI Integration:** Google Gemini API (để chấm điểm Đấu trường và trả lời Chatbot).

## 🚀 Hướng dẫn cài đặt và chạy thử nghiệm

### 1. Yêu cầu hệ thống
- Node.js >= 18.x
- npm hoặc pnpm

### 2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Thiết lập biến môi trường (Environment Variables)
Tạo file `.env.local` ở thư mục gốc và thêm các API Keys cần thiết:
```env
# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Upstash Redis Keys (Leaderboard)
KV_REST_API_URL="your_upstash_url"
KV_REST_API_TOKEN="your_upstash_token"
```

### 4. Chạy dự án (Frontend & Serverless API)
Vì dự án có sử dụng API Backend (Vercel serverless), để chạy toàn bộ ở môi trường local, bạn cần dùng Vercel CLI:
```bash
npm i -g vercel
vercel dev
```
*(Nếu chỉ muốn xem giao diện mà không gọi API, bạn có thể chạy `npm run dev` ở port 5173).*

### 5. Build lên môi trường Production
```bash
npm run build
```

## 📝 Tuyên bố sử dụng AI
Dự án có sự hỗ trợ của Trí tuệ Nhân tạo (Gemini / Claude / ChatGPT) trong việc lập trình, debug và gợi ý thiết kế giao diện, trong khi phần nội dung học thuật, xây dựng logic luật chơi và cấu trúc hệ thống hoàn toàn do nhóm sinh viên tự thiết kế và định hướng. Xem chi tiết tại `theory/ai-usage.md`.

---
*Dự án thực hiện cho mục đích giáo dục và học tập.*
