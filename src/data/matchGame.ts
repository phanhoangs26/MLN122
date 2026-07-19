// src/data/matchGame.ts
// Dữ liệu minigame "Nối khái niệm"

export interface MatchItem {
  id: string;
  term: string;       // thuật ngữ / khái niệm (bên trái)
  definition: string; // định nghĩa (bên phải)
  category: 'level' | 'form'; // mức độ hội nhập hay hình thức kinh tế đối ngoại
}

// Nhóm 1: 5 mức độ hội nhập
const levelItems: MatchItem[] = [
  {
    id: 'pta',
    term: 'PTA',
    definition: 'Ưu đãi thuế quan cho một số nhóm hàng nhất định giữa các bên ký kết. Mức cam kết thấp nhất trong các hình thức hội nhập.',
    category: 'level',
  },
  {
    id: 'fta',
    term: 'FTA',
    definition: 'Xóa bỏ phần lớn thuế quan và rào cản phi thuế quan đối với hàng hóa giữa các thành viên. Hình thức Việt Nam tham gia rộng rãi nhất.',
    category: 'level',
  },
  {
    id: 'cu',
    term: 'Liên minh thuế quan (CU)',
    definition: 'Bên cạnh tự do hóa thương mại nội khối, các thành viên áp dụng biểu thuế quan chung thống nhất đối với hàng hóa từ bên ngoài khối.',
    category: 'level',
  },
  {
    id: 'common-market',
    term: 'Thị trường chung',
    definition: 'Tự do lưu chuyển không chỉ hàng hóa mà cả vốn, lao động và dịch vụ giữa các thành viên — mức độ hội nhập sâu hơn Liên minh thuế quan.',
    category: 'level',
  },
  {
    id: 'emu',
    term: 'Liên minh kinh tế – tiền tệ',
    definition: 'Mức cao nhất: thống nhất chính sách kinh tế, tài chính và sử dụng đồng tiền chung. Ví dụ: Liên minh châu Âu (EU) với đồng Euro.',
    category: 'level',
  },
];

// Nhóm 2: 4 hình thức kinh tế đối ngoại
const formItems: MatchItem[] = [
  {
    id: 'ngoai-thuong',
    term: 'Ngoại thương',
    definition: 'Hoạt động xuất khẩu và nhập khẩu hàng hóa — hình thức cơ bản nhất của hội nhập kinh tế đối ngoại. Cán cân thương mại phản ánh vị thế hội nhập của quốc gia.',
    category: 'form',
  },
  {
    id: 'dau-tu-quoc-te',
    term: 'Đầu tư quốc tế',
    definition: 'Bao gồm FDI (doanh nghiệp nước ngoài đầu tư trực tiếp xây dựng cơ sở sản xuất) và đầu tư gián tiếp (mua cổ phiếu, trái phiếu). FDI có tác động lan tỏa mạnh về công nghệ và việc làm.',
    category: 'form',
  },
  {
    id: 'hop-tac-khcn',
    term: 'Hợp tác khoa học – công nghệ',
    definition: 'Chuyển giao công nghệ, nghiên cứu liên kết, học bổng đào tạo, hợp tác giáo dục đại học và trao đổi chuyên gia — con đường rút ngắn khoảng cách công nghệ.',
    category: 'form',
  },
  {
    id: 'dich-vu-ngoai-te',
    term: 'Dịch vụ thu ngoại tệ',
    definition: 'Du lịch quốc tế, xuất khẩu lao động (kiều hối), vận tải và logistics quốc tế, dịch vụ tài chính – ngân hàng – bảo hiểm xuyên biên giới.',
    category: 'form',
  },
];

export const allMatchItems: MatchItem[] = [...levelItems, ...formItems];

export const matchGroups = [
  { label: '5 mức độ hội nhập', items: levelItems },
  { label: '4 hình thức kinh tế đối ngoại', items: formItems },
];
