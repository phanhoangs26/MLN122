 # MLN — Game Quiz (React + Vite)

 Dự án web quiz dạng game (React + TypeScript + Vite + Tailwind). Phiên bản trong repo đã được tùy chỉnh giao diện "gaming" và tiếng Việt.

 **Yêu cầu**
- Node.js >= 18
- pnpm / npm (sử dụng `npm` trong hướng dẫn dưới)

 **Cài đặt**
```bash
npm install
```

**Chạy dev**
```bash
npm run dev
# Dev server thường chạy ở http://localhost:5173 (nếu 5173 bận sẽ chuyển sang port khác)
```

**Build sản phẩm**
```bash
npm run build
```

**Chạy bản build (preview)**
```bash
npm run preview
```

**Ghi chú quan trọng**
- Trước khi push chia sẻ, đừng bao gồm `node_modules` hay file chứa thông tin nhạy cảm (.env). File `.gitignore` đã được thêm.
- Nếu thấy cảnh báo về `@types/canvas-confetti`, cài thêm khi cần:
```bash
npm i -D @types/canvas-confetti
```

**Các file chính**
- `src/app/pages/Quiz.tsx` — Trang quiz / boss battle (đã tùy biến animation và giao diện).
- `src/app/pages/Map.tsx` — Bản đồ hành trình.
- `src/app/pages/Home.tsx` — Trang chính.

Bạn cần trợ giúp thêm (ví dụ: thêm hướng dẫn deploy, tạo release, đổi hình ảnh assets), cho tôi biết bước tiếp theo bạn muốn.
