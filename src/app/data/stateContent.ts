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
    title: 'Các kiểu và hình thức nhà nước',
    short: 'Chủ nô → phong kiến → tư sản → vô sản',
    front: 'Lịch sử đã tồn tại mấy kiểu nhà nước? Khác biệt căn bản nằm ở đâu?',
    back: 'Bốn kiểu: chủ nô, phong kiến, tư sản, vô sản. Ba kiểu đầu là công cụ của thiểu số bóc lột. Nhà nước vô sản là kiểu “đặc biệt” — nhà nước của số đông thống trị số ít.',
  },
  {
    id: 'vietnam',
    title: 'Vận dụng và nhà nước tiêu vong',
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
  questions: { front: string; back: string }[];
};

export const timelineRounds: TimelineRound[] = [
  {
    id: 'origin_hard',
    title: 'Tiến trình logic hình thành Nhà nước',
    prompt: 'Sắp xếp 7 bước theo đúng tiến trình logic dẫn đến sự ra đời và hoàn thiện bộ máy nhà nước theo giáo trình Mác - Lênin.',
    steps: [
      { label: 'Sự phát triển của lực lượng sản xuất', note: 'Công cụ lao động tiến bộ làm tăng năng suất lao động, tạo ra sản phẩm thặng dư.' },
      { label: 'Xuất hiện chế độ tư hữu', note: 'Sản phẩm thặng dư bị chiếm đoạt, tư liệu sản xuất rơi vào tay một thiểu số người.' },
      { label: 'Phân hóa giai cấp xã hội', note: 'Xã hội rạn nứt thành giai cấp bóc lột và giai cấp bị bóc lột (nguyên nhân sâu xa).' },
      { label: 'Mâu thuẫn giai cấp không thể điều hòa', note: 'Cuộc đấu tranh giai cấp gay gắt đe dọa tiêu diệt cả các giai cấp lẫn xã hội (nguyên nhân trực tiếp).' },
      { label: 'Thiết lập quyền lực công cộng đặc biệt', note: 'Hình thành lực lượng vũ trang (quân đội, cảnh sát) và nhà tù tách rời khỏi dân cư để trấn áp.' },
      { label: 'Phân chia dân cư theo lãnh thổ', note: 'Quản lý cư dân theo biên giới quốc gia thay vì huyết thống như thị tộc, bộ lạc.' },
      { label: 'Thu thuế và phát hành quốc trái', note: 'Bắt buộc đóng góp tài chính để nuôi dưỡng bộ máy quyền lực đứng trên xã hội.' },
    ],
    questions: [
      {
        front: 'Vì sao lực lượng vũ trang (quân đội, cảnh sát) lại phải tách rời khỏi dân cư?',
        back: 'Vì khi xã hội đã phân chia thành các giai cấp thù địch, việc tổ chức vũ trang tự động của dân cư là không thể. Giai cấp thống trị phải lập ra lực lượng chuyên nghiệp để trấn áp sự phản kháng của giai cấp bị trị.',
      },
      {
        front: 'Phân chia dân cư theo lãnh thổ khác với tổ chức thị tộc ở điểm nào?',
        back: 'Tổ chức thị tộc dựa trên quan hệ huyết thống. Trong khi đó, nhà nước quản lý công dân dựa trên nơi cư trú (lãnh thổ), không phân biệt bộ tộc hay huyết thống, từ đó hình thành biên giới quốc gia.',
      },
    ],
  },
  {
    id: 'origin',
    title: 'Nhà nước ra đời và tiêu vong như thế nào?',
    prompt: 'Sắp xếp 6 bước theo đúng tiến trình: từ xã hội nguyên thủy tới khi nhà nước tiêu vong.',
    steps: [
      { label: 'Xã hội cộng sản nguyên thủy', note: 'Thị tộc, bộ lạc tự quản; chưa có tư hữu, chưa có giai cấp, chưa có nhà nước.' },
      { label: 'Lực lượng sản xuất phát triển, của cải dư thừa', note: 'Công cụ lao động tiến bộ, năng suất tăng, lần đầu xuất hiện sản phẩm thặng dư — tiền đề cho chế độ tư hữu.' },
      { label: 'Chế độ tư hữu, phân hóa giai cấp', note: 'Tư liệu sản xuất rơi vào tay thiểu số; hình thành giai cấp thống trị và bị trị (đầu tiên là chủ nô – nô lệ).' },
      { label: 'Mâu thuẫn giai cấp không thể điều hòa', note: 'Đấu tranh giai cấp gay gắt, xã hội bất lực không sao loại bỏ được — nguyên nhân trực tiếp.' },
      { label: 'Nhà nước ra đời', note: 'Lực lượng đứng trên xã hội, giữ xung đột trong “vòng trật tự” có lợi cho giai cấp thống trị.' },
      { label: 'Nhà nước tiêu vong', note: 'Khi xã hội đạt giai đoạn cộng sản chủ nghĩa, không còn giai cấp thì nhà nước “tự tiêu vong”.' },
    ],
    questions: [
      {
        front: 'Nguyên nhân SÂU XA và nguyên nhân TRỰC TIẾP làm nhà nước ra đời là gì?',
        back: 'Nguyên nhân sâu xa: lực lượng sản xuất phát triển dẫn đến của cải dư thừa tương đối, xuất hiện chế độ tư hữu về tư liệu sản xuất và của cải. Nguyên nhân trực tiếp: mâu thuẫn giai cấp trong xã hội gay gắt, không thể điều hòa được.',
      },
      {
        front: 'Vì sao Ăngghen khẳng định nhà nước là một "phạm trù lịch sử"?',
        back: 'Vì “nhà nước là sản phẩm của một xã hội đã phát triển tới một giai đoạn nhất định”. Nhà nước không tồn tại vĩnh viễn: nó chỉ ra đời khi xã hội phân chia giai cấp và sẽ tiêu vong khi xã hội không còn giai cấp.',
      },
      {
        front: 'Trong xã hội cộng sản nguyên thủy đã có nhà nước chưa? Vì sao?',
        back: 'Chưa. Xã hội nguyên thủy tồn tại theo thể chế tự quản của cộng đồng thị tộc, bộ lạc; chưa có chế độ tư hữu, chưa phân chia giai cấp nên chưa cần đến nhà nước với tư cách cơ quan quyền lực của giai cấp thống trị.',
      },
      {
        front: 'Theo V.I. Lênin, sự tồn tại của nhà nước chứng tỏ điều gì?',
        back: 'Bất cứ ở đâu, hễ lúc nào và chừng nào mà những mâu thuẫn giai cấp không thể điều hòa được thì nhà nước xuất hiện. Ngược lại, sự tồn tại của nhà nước chứng tỏ rằng những mâu thuẫn giai cấp là không thể điều hòa được.',
      },
      {
        front: 'Ăngghen ví nhà nước là một "lực lượng" như thế nào?',
        back: 'Là một lực lượng nảy sinh từ xã hội nhưng lại đứng trên xã hội và ngày càng tách rời khỏi xã hội, có nhiệm vụ làm dịu bớt xung đột và giữ cho xung đột giai cấp nằm trong vòng “trật tự” có lợi cho giai cấp thống trị.',
      },
      {
        front: 'Nhà nước sẽ "tiêu vong" trong điều kiện nào?',
        back: 'Khi xã hội phát triển tới giai đoạn cộng sản chủ nghĩa, mâu thuẫn giai cấp và giai cấp không còn nữa thì cơ sở tồn tại của nhà nước mất đi, nhà nước “tự tiêu vong” — đây cũng là một phạm trù lịch sử có ra đời và có mất đi.',
      },
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
    ],    questions: [
      {
        front: 'Lịch sử đã tồn tại bao nhiêu kiểu nhà nước chính?',
        back: 'Bốn kiểu: nhà nước chủ nô, phong kiến, tư sản, và vô sản. Mỗi kiểu tương ứng với một phương thức sản xuất và giai cấp thống trị khác nhau.',
      },
      {
        front: 'Giai cấp nào lập ra nhà nước chủ nô?',
        back: 'Giai cấp chủ nô. Đây là kiểu nhà nước đầu tiên trong lịch sử, được dùng để thống trị giai cấp nô lệ và các tầng lớp khác.',
      },
      {
        front: 'Nhà nước phong kiến là công cụ của giai cấp nào?',
        back: 'Nhà nước phong kiến là công cụ của giai cấp địa chủ, phong kiến. Nó tồn tại dưới hai hình thức: tập quyền (vua có quyền tuyệt đối) và phân quyền (quyền lực tán tạo giữa các thế lực phong kiến cát cứ).',
      },
      {
        front: 'Nhà nước tư sản có thực sự "trung lập" không?',
        back: 'Không. Dù nhà nước tư sản tồn tại dưới nhiều hình thức (cộng hòa, quân chủ lập hiến, v.v.), về bản chất tất cả đều là "nền chuyên chính tư sản" — công cụ của giai cấp tư sản để bóc lột các giai cấp khác.',
      },
      {
        front: 'Điều gì làm cho nhà nước vô sản là "đặc biệt"?',
        back: 'Nó là nhà nước của số ĐÔNG (số đông nhân dân lao động, do giai cấp công nhân lãnh đạo) thống trị số ÍT (giai cấp cũ bị đánh đổ). Ngược lại ba kiểu trước: là công cụ của thiểu số thống trị đại đa số.',
      },
      {
        front: 'Tiến trình lịch sử của các kiểu nhà nước diễn ra như thế nào?',
        back: 'Theo trình tự: chủ nô → phong kiến → tư sản → vô sản. Mỗi sự thay thế gắn với sự phát triển của lực lượng sản xuất và sự xuất hiện của giai cấp mới thay thế giai cấp cũ.',
      },
    ],  },
];

// ---- Game: Nối khái niệm ----
export type MatchRound = {
  id: string;
  title: string;
  prompt: string;
  pairs: { left: string; right: string }[];
  questions: { front: string; back: string }[];
};

export const matchRounds: MatchRound[] = [
  {
    id: 'dialectics',
    title: 'Mối quan hệ biện chứng',
    prompt: 'Dựa vào giáo trình, nối các khái niệm về chức năng và bản chất nhà nước sao cho đúng logic triết học.',
    pairs: [
      { left: 'Nguyên nhân sâu xa', right: 'Lực lượng sản xuất phát triển dẫn đến chế độ tư hữu' },
      { left: 'Nguyên nhân trực tiếp', right: 'Mâu thuẫn giai cấp gay gắt không thể điều hòa' },
      { left: 'Chức năng thống trị chính trị', right: 'Quyết định, chi phối và định hướng chức năng xã hội' },
      { left: 'Chức năng xã hội', right: 'Đảm bảo trật tự, là cơ sở để nhà nước duy trì sự tồn tại lâu dài' },
      { left: 'Chức năng đối nội', right: 'Giữ vai trò chủ yếu, quyết định sự tồn tại vững chắc của chế độ' },
      { left: 'Bản chất nhà nước', right: 'Tổ chức chính trị của giai cấp thống trị về kinh tế' },
    ],
    questions: [
      {
        front: 'Tại sao chức năng đối nội lại giữ vai trò chủ yếu hơn đối ngoại?',
        back: 'Nhà nước trước hết phải duy trì được trật tự xã hội bên trong để tồn tại. Chỉ khi làm tốt chức năng đối nội, nhà nước mới có điều kiện thực hiện tốt chức năng đối ngoại và nâng cao vị thế trên trường quốc tế.',
      },
      {
        front: 'Nếu nhà nước chỉ tập trung vào chức năng thống trị chính trị mà bỏ qua chức năng xã hội thì sao?',
        back: 'Theo Ph. Ăngghen, chức năng xã hội là cơ sở của sự thống trị chính trị. Nếu không giải quyết được các vấn đề xã hội, xã hội sẽ mất ổn định, và chính quyền nhà nước đó sẽ khó có thể tồn tại lâu dài.',
      },
    ],
  },
  {
    id: 'features',
    title: 'Ba đặc trưng của nhà nước',
    prompt: 'Nối mỗi đặc trưng với nội dung đúng của nó.',
    pairs: [
      { left: 'Quản lý theo lãnh thổ', right: 'Phân chia dân cư theo vùng lãnh thổ, hình thành biên giới quốc gia' },
      { left: 'Quyền lực công cộng đặc biệt', right: 'Quân đội, cảnh sát, nhà tù, tòa án — bộ máy cưỡng chế tách khỏi dân cư' },
      { left: 'Thuế khóa', right: 'Nguồn thu bắt buộc để nuôi bộ máy nhà nước' },
    ],
    questions: [
      {
        front: 'Lãnh thổ là gì trong nhà nước? Nó khác gì với bộ tộc?',
        back: 'Lãnh thổ là vùng địa lý mà nhà nước quản lý. Khác với tổ chức huyết tộc (thị tộc, bộ lạc) dựa trên huyết thống, lãnh thổ quốc gia tập hợp nhiều người có quan hệ kinh tế, xã hội, chính trị trên cơ sở địa lý không phụ thuộc huyết thống.',
      },
      {
        front: 'Quyền lực công cộng được tổ chức và biểu hiện như thế nào?',
        back: 'Quyền lực công cộng bao gồm quân đội, cảnh sát vũ trang, nhà tù, tòa án, và bộ máy hành chính. Nó là "bộ máy cưỡng chế đặc biệt" tách khỏi dân cư, dùng để thực hiện chức năng trấn áp của nhà nước.',
      },
      {
        front: 'Tại sao nhà nước cần thu thuế? Nguồn tài chính này dùng để làm gì?',
        back: 'Để nuôi bộ máy nhà nước. Theo Lênin: "muốn duy trì quyền lực xã hội đặc biệt, đặt lên trên xã hội, thì phải có thuế và quốc trái". Thuế được dùng để trả lương cho công chức, binh lính, và duy trì hoạt động của nhà nước.',
      },
      {
        front: 'Quân đội và cảnh sát thuộc về đặc trưng nào của nhà nước?',
        back: 'Quân đội và cảnh sát là thành phần cơ bản của "quyền lực công cộng đặc biệt" — đặc trưng thứ hai của nhà nước. Chúng là công cụ chính để thực hiện chức năng trấn áp và bóc lột của nhà nước.',
      },
      {
        front: 'Biên giới quốc gia được hình thành như thế nào?',
        back: 'Biên giới quốc gia là kết quả của việc nhà nước quản lý dân cư theo lãnh thổ. Khi nhà nước phân định rõ vùng lãnh thổ do mình cai trị, biên giới quốc gia được hình thành, tách rời từng quốc gia - dân tộc với nhau.',
      },
      {
        front: 'Ba đặc trưng này có bắt buộc phải cùng tồn tại không?',
        back: 'Có. Ba đặc trưng cơ bản này là những điều kiện tiên quyết để nhà nước tồn tại và hoạt động. Nếu thiếu bất kỳ đặc trưng nào, đó không còn là nhà nước theo định nghĩa của Mác – Lênin.',
      },
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
    questions: [
      {
        front: 'Nhà nước chủ nô là bộ máy của giai cấp nào?',
        back: 'Nhà nước chủ nô là bộ máy của giai cấp chủ nô. Nó được dùng để thống trị giai cấp nô lệ, duy trì chế độ nô lệ, và bảo vệ quyền sở hữu nô lệ của giai cấp chủ nô.',
      },
      {
        front: 'Giai cấp nông dân có thể lập ra nhà nước riêng của mình không?',
        back: 'Không. Giai cấp nông dân không có khả năng lập ra nhà nước riêng. Giai cấp nông dân thường liên minh với giai cấp công nhân (giai cấp vô sản) trong cách mạng, dưới sự lãnh đạo của công nhân.',
      },
      {
        front: 'Phong kiến là giai cấp thống trị trong kiểu nhà nước nào?',
        back: 'Phong kiến (hay địa chủ phong kiến) là giai cấp thống trị trong nhà nước phong kiến. Nhà nước phong kiến tồn tại với hai hình thức: tập quyền (vua có quyền tuyệt đối) và phân quyền (quyền bị phân tán).',
      },
      {
        front: 'Tại sao giai cấp tư sản lập ra nhiều hình thức nhà nước khác nhau?',
        back: 'Mặc dù tồn tại dưới nhiều hình thức (cộng hòa, quân chủ lập hiến, tổng thống, thủ tướng, v.v.), nhưng về bản chất tất cả đều là "chuyên chính tư sản". Sự đa dạng hình thức là do tình hình lịch sử, văn hóa, cấu trúc giai cấp khác nhau của từng quốc gia.',
      },
      {
        front: 'Lũ nhất phục vụ mục đích xã hội của nhà nước là giai cấp nào?',
        back: 'Giai cấp vô sản — qua nhà nước vô sản. Nhà nước vô sản phục vụ lợi ích của số đông nhân dân lao động, không phải thiểu số. Tuy nhiên, để tiến tới xã hội cộng sản, nó phải thực hiện cuộc cách mạng văn hóa và xây dựng xã hội mới.',
      },
      {
        front: 'Hình ảnh của nhà nước vô sản khác biệt với ba kiểu trước ở điểm gì?',
        back: 'Ba kiểu trước (chủ nô, phong kiến, tư sản) là nhà nước của thiểu số bóc lột đại đa số. Nhà nước vô sản là kiểu "đặc biệt" — nhà nước của SỐ ĐÔNG (số đông nhân dân lao động) thống trị SỐ ÍT (giai cấp thích nghi và các thành phần phản động còn sót lại).',
      },
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
    questions: [
      {
        front: 'Chức năng thống trị chính trị là gì? Nó chiếm vai trò gì?',
        back: 'Là chức năng sử dụng bộ máy quyền lực (quân đội, cảnh sát, tòa án) để duy trì sự thống trị của giai cấp cầm quyền và đàn áp các giai cấp bị trị. Nó chiếm vai trò quyết định, vì nó quy định tính chất và hướng đi của tất cả các chức năng khác.',
      },
      {
        front: 'Chức năng xã hội của nhà nước bao gồm những gì?',
        back: 'Bao gồm quản lý các công việc chung của xã hội: thủy lợi, giao thông, y tế, giáo dục, bảo vệ môi trường, v.v. Nó được thực hiện dưới lăng kính giai cấp của giai cấp thống trị, nhằm duy trì xã hội trong "trật tự" có lợi cho giai cấp đó.',
      },
      {
        front: 'Mối quan hệ giữa chức năng thống trị chính trị và chức năng xã hội?',
        back: 'Chức năng thống trị chính trị lãnh đạo và quy định chức năng xã hội. Chức năng xã hội là cơ sở giúp nhà nước duy trì sự ổn định xã hội để tiếp tục thực hiện chức năng thống trị. Hai chức năng này luôn kết hợp mật thiết với nhau.',
      },
      {
        front: 'Chức năng đối nội của nhà nước thể hiện như thế nào?',
        back: 'Thể hiện qua việc thực hiện đường lối đối nội nhằm duy trì trật tự xã hội bằng cách sử dụng chính sách, pháp luật, giáo dục, văn hóa, truyền thông, v.v. Nó liên quan đến các lĩnh vực chính trị, kinh tế, xã hội, y tế, giáo dục của quốc gia.',
      },
      {
        front: 'Chức năng đối ngoại của nhà nước là gì? Tầm quan trọng?',
        back: 'Là triển khai chính sách đối ngoại để giải quyết mối quan hệ với các nhà nước khác, bảo vệ lãnh thổ quốc gia, trao đổi kinh tế, văn hóa, khoa học. Trong thế giới hiện đại, chức năng đối ngoại rất quan trọng cho sự phát triển kinh tế - xã hội của quốc gia.',
      },
      {
        front: 'Chức năng đối nội hay đối ngoại chiếm vai trò chủ yếu?',
        back: 'Chức năng đối nội chiếm vai trò chủ yếu. Nhà nước trước hết phải duy trì được trật tự xã hội bên trong để tồn tại. Khi làm tốt chức năng đối nội, nhà nước mới có điều kiện để thực hiện tốt chức năng đối ngoại, thu hút đầu tư, phát triển kinh tế.',
      },
    ],
  },
];
