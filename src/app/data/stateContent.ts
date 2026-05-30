// Nội dung học tập — bám sát Chương III: "Nhà nước và Cách mạng xã hội"
// (Giáo trình Triết học Mác – Lênin). Tập trung vào luận điểm của V.I. Lênin:
// "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp
//  không thể điều hòa được."

export const LENIN_QUOTE =
  'Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.';
export const LENIN_SOURCE = 'V.I. Lênin, “Nhà nước và Cách mạng” (1917)';

// 9 "luận cứ" (vũ khí lý luận) — mỗi chặng mê cung (1→9) trao một luận cứ,
// dùng làm "khiên" trong trận phản biện cuối (chặng 10).
export type ArgumentItem = { id: string; icon: string; label: string };

export const argumentItems: ArgumentItem[] = [
  { id: 'origin', icon: '🌿', label: 'Nguyên thủy' },
  { id: 'private', icon: '⚖️', label: 'Tư hữu' },
  { id: 'conflict', icon: '🔥', label: 'Mâu thuẫn' },
  { id: 'essence', icon: '🎯', label: 'Bản chất' },
  { id: 'features', icon: '🏛️', label: 'Đặc trưng' },
  { id: 'functions', icon: '⚙️', label: 'Chức năng' },
  { id: 'types', icon: '📜', label: 'Các kiểu' },
  { id: 'forms', icon: '👑', label: 'Hình thức' },
  { id: 'proletarian', icon: '✊', label: 'Vô sản' },
];

export type Concept = {
  id: string;
  title: string;
  short: string;
  front: string; // câu hỏi gợi nhớ (mặt trước flashcard)
  back: string; // nội dung cốt lõi (mặt sau)
};

// 6 khái niệm cốt lõi của luận điểm về nhà nước
export const concepts: Concept[] = [
  {
    id: 'origin',
    title: 'Nguồn gốc của nhà nước',
    short: 'Nhà nước là một phạm trù lịch sử',
    front: 'Nguyên nhân SÂU XA và TRỰC TIẾP làm nhà nước ra đời là gì?',
    back: 'Nguyên nhân sâu xa: lực lượng sản xuất phát triển → của cải dư thừa → xuất hiện chế độ tư hữu. Nguyên nhân trực tiếp: mâu thuẫn giai cấp gay gắt, không thể điều hòa được.',
  },
  {
    id: 'irreconcilable',
    title: 'Mâu thuẫn không thể điều hòa',
    short: 'Luận điểm trung tâm của Lênin',
    front: 'Theo Lênin, sự tồn tại của nhà nước chứng tỏ điều gì?',
    back: 'Ở đâu, lúc nào mà mâu thuẫn giai cấp không thể điều hòa thì nhà nước xuất hiện; và ngược lại, sự tồn tại của nhà nước chứng tỏ mâu thuẫn giai cấp là không thể điều hòa được.',
  },
  {
    id: 'essence',
    title: 'Bản chất của nhà nước',
    short: 'Công cụ chuyên chính giai cấp',
    front: 'Về bản chất, nhà nước là gì?',
    back: 'Là tổ chức chính trị của giai cấp thống trị về kinh tế, dùng để trấn áp các giai cấp khác và bảo vệ trật tự có lợi cho mình. Không có nhà nước đứng trên hay ngoài giai cấp.',
  },
  {
    id: 'features',
    title: 'Ba đặc trưng cơ bản',
    short: 'Lãnh thổ · Quyền lực công cộng · Thuế',
    front: 'Ba đặc trưng cơ bản của nhà nước (theo Ăngghen – Lênin) là gì?',
    back: '1) Quản lý cư dân theo lãnh thổ; 2) Có bộ máy quyền lực công cộng đặc biệt mang tính cưỡng chế (quân đội, cảnh sát, nhà tù, tòa án); 3) Đặt ra và thu thuế để nuôi bộ máy nhà nước.',
  },
  {
    id: 'types',
    title: 'Các kiểu & hình thức nhà nước',
    short: 'Chủ nô → phong kiến → tư sản → vô sản',
    front: 'Lịch sử đã tồn tại mấy kiểu nhà nước? Khác biệt căn bản nằm ở đâu?',
    back: 'Bốn kiểu: chủ nô, phong kiến, tư sản, vô sản. Ba kiểu đầu là công cụ của thiểu số bóc lột. Nhà nước vô sản là kiểu “đặc biệt” — nhà nước của số đông thống trị số ít.',
  },
  {
    id: 'vietnam',
    title: 'Vận dụng & nhà nước tiêu vong',
    short: 'Nhà nước pháp quyền XHCN Việt Nam',
    front: 'Nhà nước sẽ tiêu vong khi nào? Bản chất Nhà nước Việt Nam hiện nay?',
    back: 'Khi xã hội đạt tới giai đoạn cộng sản chủ nghĩa, không còn giai cấp, nhà nước “tự tiêu vong”. Nhà nước CHXHCN Việt Nam là nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân: “Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ”.',
  },
];

// ---- Game: Sắp xếp dòng thời gian ----
export type TimelineRound = {
  id: string;
  title: string;
  prompt: string;
  // mảng đã ở ĐÚNG thứ tự; game sẽ tự xáo trộn
  steps: { label: string; note: string }[];
};

export const timelineRounds: TimelineRound[] = [
  {
    id: 'origin',
    title: 'Nhà nước ra đời & tiêu vong như thế nào?',
    prompt: 'Sắp xếp 10 bước theo đúng tiến trình: từ xã hội nguyên thủy tới khi nhà nước tiêu vong.',
    steps: [
      { label: 'Xã hội cộng sản nguyên thủy', note: 'Thị tộc, bộ lạc tự quản; chưa có tư hữu, chưa có giai cấp, chưa có nhà nước.' },
      { label: 'Lực lượng sản xuất phát triển', note: 'Công cụ lao động tiến bộ (kim loại), năng suất lao động tăng lên.' },
      { label: 'Của cải dư thừa tương đối', note: 'Lần đầu xuất hiện sản phẩm thặng dư so với nhu cầu tối thiểu.' },
      { label: 'Chế độ tư hữu xuất hiện', note: 'Tư liệu sản xuất và của cải dần rơi vào tay một thiểu số.' },
      { label: 'Bất bình đẳng, phân hóa giàu – nghèo', note: 'Quan hệ bình đẳng kiểu công xã bị phá vỡ, quan hệ áp bức bóc lột nảy sinh.' },
      { label: 'Xã hội phân chia thành giai cấp', note: 'Hình thành giai cấp thống trị và bị trị; đầu tiên là chủ nô – nô lệ.' },
      { label: 'Mâu thuẫn giai cấp không thể điều hòa', note: 'Đấu tranh giai cấp gay gắt, xã hội bất lực không sao loại bỏ được.' },
      { label: 'Nhà nước ra đời', note: 'Lực lượng đứng trên xã hội, giữ xung đột trong “vòng trật tự” có lợi cho giai cấp thống trị (nhà nước chủ nô).' },
      { label: 'Kế tiếp các kiểu nhà nước', note: 'Nhà nước phong kiến → tư sản → vô sản, gắn với từng phương thức sản xuất.' },
      { label: 'Nhà nước tiêu vong', note: 'Khi xã hội đạt giai đoạn cộng sản chủ nghĩa, không còn giai cấp thì nhà nước “tự tiêu vong”.' },
    ],
  },
  {
    id: 'types',
    title: 'Các kiểu nhà nước trong lịch sử',
    prompt: 'Sắp xếp các kiểu nhà nước theo đúng tiến trình lịch sử.',
    steps: [
      { label: 'Nhà nước chủ nô', note: 'Giai cấp chủ nô thống trị nô lệ — kiểu nhà nước đầu tiên.' },
      { label: 'Nhà nước phong kiến', note: 'Công cụ thống trị của giai cấp địa chủ, phong kiến.' },
      { label: 'Nhà nước tư sản', note: 'Bản chất là nền chuyên chính tư sản dù mang nhiều hình thức.' },
      { label: 'Nhà nước vô sản', note: 'Kiểu “đặc biệt” — nhà nước của số đông nhân dân lao động.' },
    ],
  },
];

// ---- Game: Nối khái niệm ----
export type MatchRound = {
  id: string;
  title: string;
  prompt: string;
  pairs: { left: string; right: string }[];
};

export const matchRounds: MatchRound[] = [
  {
    id: 'features',
    title: 'Ba đặc trưng của nhà nước',
    prompt: 'Nối mỗi đặc trưng với nội dung đúng của nó.',
    pairs: [
      { left: 'Quản lý theo lãnh thổ', right: 'Phân chia dân cư theo vùng lãnh thổ, hình thành biên giới quốc gia' },
      { left: 'Quyền lực công cộng đặc biệt', right: 'Quân đội, cảnh sát, nhà tù, tòa án — bộ máy cưỡng chế tách khỏi dân cư' },
      { left: 'Thuế khóa', right: 'Nguồn thu bắt buộc để nuôi bộ máy nhà nước' },
    ],
  },
  {
    id: 'types',
    title: 'Kiểu nhà nước ↔ giai cấp thống trị',
    prompt: 'Nối mỗi kiểu nhà nước với giai cấp nắm quyền tương ứng.',
    pairs: [
      { left: 'Nhà nước chủ nô', right: 'Giai cấp chủ nô thống trị nô lệ' },
      { left: 'Nhà nước phong kiến', right: 'Giai cấp địa chủ, phong kiến' },
      { left: 'Nhà nước tư sản', right: 'Giai cấp tư sản (chuyên chính tư sản)' },
      { left: 'Nhà nước vô sản', right: 'Số đông nhân dân lao động do giai cấp công nhân lãnh đạo' },
    ],
  },
  {
    id: 'functions',
    title: 'Chức năng của nhà nước',
    prompt: 'Nối mỗi chức năng với mô tả đúng.',
    pairs: [
      { left: 'Thống trị chính trị', right: 'Dùng bộ máy quyền lực duy trì sự thống trị của giai cấp cầm quyền' },
      { left: 'Chức năng xã hội', right: 'Quản lý việc chung: thủy lợi, giao thông, y tế, giáo dục…' },
      { left: 'Đối nội', right: 'Duy trì trật tự bên trong quốc gia' },
      { left: 'Đối ngoại', right: 'Quan hệ với các nhà nước khác, bảo vệ lãnh thổ' },
    ],
  },
];
