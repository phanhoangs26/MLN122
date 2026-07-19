// src/data/debateClaims.ts
// Luận điểm phiến diện mẫu cho Đấu trường phản biện AI
// Được dùng làm fallback khi không có GEMINI_API_KEY

export interface DebateClaim {
  id: string;
  claim: string;         // luận điểm phiến diện AI đưa ra
  category: string;      // chủ đề
  expectedPoints: string[]; // các ý kỳ vọng trong phản biện
  sourceHint: string;    // gợi ý nguồn tài liệu tham khảo
}

export const debateClaims: DebateClaim[] = [
  {
    id: 'dc-1',
    claim: 'Việt Nam hoàn toàn không cần hội nhập kinh tế quốc tế vì nước ta có đầy đủ tài nguyên thiên nhiên và có thể tự cung tự cấp mà không cần phụ thuộc vào thị trường nước ngoài.',
    category: 'Tính tất yếu hội nhập',
    expectedPoints: [
      'Toàn cầu hóa kinh tế là xu thế khách quan — không hội nhập thì không tự đảm bảo được điều kiện sản xuất (công nghệ, vốn, thị trường tiêu thụ)',
      'Phân công lao động quốc tế ngày càng sâu sắc — không một quốc gia nào có thể tự sản xuất mọi thứ hiệu quả',
      'Tài nguyên thiên nhiên là nguồn lực hữu hạn — cần công nghệ và vốn từ bên ngoài để khai thác, chế biến có giá trị gia tăng cao',
      'Thực tiễn: Việt Nam sau Đổi mới 1986 nhờ mở cửa mà thoát nghèo và trở thành nước thu nhập trung bình thấp',
    ],
    sourceHint: 'Chương I — Tính tất yếu khách quan, Thứ nhất và Thứ hai',
  },
  {
    id: 'dc-2',
    claim: 'Việc gia nhập WTO và ký kết nhiều FTA chỉ có lợi cho doanh nghiệp nước ngoài (FDI) còn doanh nghiệp Việt Nam thực tế không được hưởng lợi gì từ hội nhập.',
    category: 'Đánh giá lợi ích hội nhập',
    expectedPoints: [
      'Hội nhập mở ra thị trường xuất khẩu rộng lớn — dệt may, thủy sản, gỗ, nông sản Việt Nam đều hưởng lợi từ cắt giảm thuế quan',
      'Chia sẻ lợi ích là nguyên tắc cốt lõi — dù không đồng đều nhưng không phải không có lợi',
      'Hạn chế là có thật: doanh nghiệp vừa và nhỏ yếu vốn/công nghệ nên chưa tận dụng tốt ưu đãi FTA — đây là vấn đề năng lực nội tại, không phải do hội nhập',
      'Giải pháp là nâng cao năng lực cạnh tranh, không phải đóng cửa',
    ],
    sourceHint: 'Chương III — Thành tựu và Thách thức',
  },
  {
    id: 'dc-3',
    claim: 'CPTPP và EVFTA là những hiệp định bất bình đẳng vì buộc Việt Nam phải chấp nhận chuẩn mực lao động và môi trường của phương Tây, vi phạm chủ quyền quốc gia.',
    category: 'Chuẩn mực quốc tế',
    expectedPoints: [
      'Tuân thủ chuẩn mực quốc tế chung là một trong ba trụ cột của hội nhập — đây là "luật chơi" chung, không phải sự áp đặt một chiều',
      'Chuẩn mực lao động (ILO) và môi trường là lợi ích của chính người lao động và người dân Việt Nam',
      'Chủ quyền không bị xâm phạm — Việt Nam tự nguyện ký kết, có thể đàm phán lộ trình linh hoạt',
      'Thực tế Việt Nam đã đàm phán được nhiều ưu đãi và lộ trình chuyển đổi dài hạn trong các FTA thế hệ mới',
    ],
    sourceHint: 'Chương I — Ba trụ cột hội nhập; Chương II — Chuẩn bị điều kiện',
  },
  {
    id: 'dc-4',
    claim: 'Sự phụ thuộc vào khu vực FDI (chiếm 70% xuất khẩu) là thất bại của hội nhập — Việt Nam chỉ đang làm gia công cho nước ngoài mà không xây dựng được nền kinh tế độc lập.',
    category: 'FDI và chuỗi giá trị',
    expectedPoints: [
      'FDI tạo ra việc làm quy mô lớn, chuyển giao công nghệ, phát triển công nghiệp hỗ trợ — đây là thành tựu thực tế',
      'Sự mất cân bằng FDI/nội địa là thách thức có thật — cần chiến lược phát triển doanh nghiệp nội địa',
      'Tham gia chuỗi giá trị toàn cầu là bước đầu tất yếu — từ gia công tiến tới sản xuất có hàm lượng tri thức cao',
      'Phụ thuộc không đồng nghĩa thất bại — cần đánh giá theo lộ trình phát triển dài hạn',
    ],
    sourceHint: 'Chương III — Bốn trụ cột hội nhập (FDI) và Thách thức',
  },
  {
    id: 'dc-5',
    claim: 'Việt Nam chỉ cần hội nhập kinh tế ở mức FTA là đủ, không cần tham gia sâu hơn vào các hình thức như thị trường chung hay liên minh tiền tệ vì sẽ đánh mất chủ quyền kinh tế.',
    category: 'Mức độ hội nhập',
    expectedPoints: [
      'Mức độ hội nhập phải phù hợp với trình độ phát triển kinh tế và chiến lược quốc gia — không nhất thiết phải tiến lên mức cao nhất',
      'Liên minh tiền tệ yêu cầu sự hội tụ kinh tế rất cao — EU là ví dụ cần nhiều thập kỷ chuẩn bị',
      'Việt Nam hiện tập trung vào FTA thế hệ mới (CPTPP, EVFTA, RCEP) là phù hợp với năng lực và mục tiêu',
      'Hội nhập sâu không đồng nghĩa mất chủ quyền — đây là sự chia sẻ có chủ quyền, có kiểm soát',
    ],
    sourceHint: 'Chương II — Các mức độ hội nhập từ thấp đến cao',
  },
];

// Lấy ngẫu nhiên một luận điểm
export function getRandomClaim(): DebateClaim {
  return debateClaims[Math.floor(Math.random() * debateClaims.length)];
}
