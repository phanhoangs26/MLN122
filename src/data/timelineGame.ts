// src/data/timelineGame.ts
// Dữ liệu minigame "Xếp dòng thời gian" — 7 mốc hội nhập của Việt Nam

export interface TimelineItem {
  id: string;
  year: number;
  date?: string; // ngày cụ thể nếu có
  event: string;
  shortLabel: string; // hiển thị trong game
  description: string;
  icon: string; // emoji
  color: string; // CSS color var
}

export const timelineItems: TimelineItem[] = [
  {
    id: 'doi-moi',
    year: 1986,
    event: 'Đổi mới — Đại hội Đảng VI',
    shortLabel: 'Đổi mới 1986',
    description: 'Chuyển sang kinh tế thị trường định hướng XHCN; mở đường cho hội nhập quốc tế.',
    icon: '🔄',
    color: '#C08A2E',
  },
  {
    id: 'asean',
    year: 1995,
    event: 'Gia nhập ASEAN',
    shortLabel: 'ASEAN 1995',
    description: 'Việt Nam trở thành thành viên chính thức thứ 7 của Hiệp hội các quốc gia Đông Nam Á.',
    icon: '🌏',
    color: '#3B82F6',
  },
  {
    id: 'apec',
    year: 1998,
    event: 'Gia nhập APEC',
    shortLabel: 'APEC 1998',
    description: 'Việt Nam tham gia Diễn đàn hợp tác kinh tế châu Á–Thái Bình Dương, kết nối 21 nền kinh tế.',
    icon: '🌐',
    color: '#8B5CF6',
  },
  {
    id: 'wto',
    year: 2007,
    date: '11/1/2007',
    event: 'Gia nhập WTO — thành viên thứ 150',
    shortLabel: 'WTO 2007',
    description: 'Sau 11 năm đàm phán, Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới.',
    icon: '⚖️',
    color: '#10B981',
  },
  {
    id: 'cptpp',
    year: 2019,
    date: '14/1/2019',
    event: 'CPTPP có hiệu lực',
    shortLabel: 'CPTPP 2019',
    description: 'Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương có hiệu lực với Việt Nam từ 14/1/2019.',
    icon: '🤝',
    color: '#F59E0B',
  },
  {
    id: 'evfta',
    year: 2020,
    date: '1/8/2020',
    event: 'EVFTA có hiệu lực',
    shortLabel: 'EVFTA 2020',
    description: 'Hiệp định Thương mại Tự do Việt Nam–Liên minh châu Âu (EU) có hiệu lực từ 1/8/2020, mở ra thị trường 450 triệu dân.',
    icon: '🇪🇺',
    color: '#6366F1',
  },
  {
    id: 'rcep',
    year: 2022,
    date: '1/1/2022',
    event: 'RCEP có hiệu lực',
    shortLabel: 'RCEP 2022',
    description: 'Hiệp định Đối tác Kinh tế Toàn diện Khu vực có hiệu lực, tạo ra khối thương mại tự do lớn nhất thế giới (30% GDP toàn cầu).',
    icon: '🌍',
    color: '#A3323A',
  },
];

// Thứ tự đúng (đã sắp xếp theo năm)
export const correctOrder = timelineItems.map(item => item.id);
