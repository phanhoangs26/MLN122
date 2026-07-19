# Hội nhập kinh tế quốc tế của Việt Nam
**Dự án học tập tương tác — Kinh tế Chính trị Mác–Lênin**

Dự án này là một web app học tập tương tác chủ đề Hội nhập kinh tế quốc tế, bao gồm thư viện lý thuyết, minigame ôn tập (Xếp dòng thời gian, Nối khái niệm) và hệ thống Chatbot/Đấu trường phản biện tích hợp AI (Gemini).

## Tech Stack
- **Frontend**: React 18, Vite 6, TailwindCSS v4, React Router 7, Framer Motion, Zustand
- **Backend**: Vercel Serverless Functions (`/api/*`)
- **Database**: Upstash Redis (bảng xếp hạng) / fallback bằng LocalStorage
- **AI Integration**: Google Gemini API (`gemini-1.5-flash`) / fallback chấm điểm nội bộ

## Hướng dẫn cài đặt

### Yêu cầu
- Node.js >= 18
- pnpm (khuyên dùng) hoặc npm

### Cài đặt dependencies
```bash
npm install
```

### Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc dựa trên `.env.example`:
```
GEMINI_API_KEY=your_gemini_api_key_here
KV_REST_API_URL=https://your-upstash-redis-url.upstash.io
KV_REST_API_TOKEN=your_upstash_redis_token_here
```
*(Lưu ý: Nếu không có các API key này, ứng dụng vẫn hoạt động bình thường nhờ hệ thống fallback local, nhưng chức năng AI và Leaderboard toàn cầu sẽ bị giới hạn)*

### Chạy môi trường phát triển (Local)
Để test cả Frontend (Vite) và Backend (Vercel Serverless Functions) cục bộ, bạn nên dùng Vercel CLI:
```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Chạy dev server mô phỏng môi trường Vercel (sẽ load cả biến môi trường từ .env)
vercel dev
```
Nếu chỉ muốn chạy Frontend (không cần API):
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

## Cấu trúc thư mục chính
- `src/components/`: Các component tái sử dụng (Nav, StampBadge, Layout)
- `src/data/`: Dữ liệu nội dung học thuyết và minigame (dạng TypeScript)
- `src/pages/`: Các màn hình của ứng dụng (Home, Theory, Games, Leaderboard, Chatbot)
- `src/store/`: Quản lý state toàn cục bằng Zustand (tiến trình học, điểm số)
- `src/styles/`: Thiết lập CSS Tokens theo chủ đề "Hộ chiếu hội nhập"
- `api/`: Các serverless function (chat.js, debate.js, leaderboard.js, textbook.js)
