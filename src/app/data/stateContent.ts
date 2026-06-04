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
  successInsight?: string;
  // mảng đã ở ĐÚNG thứ tự; game sẽ tự xáo trộn
  steps: { label: string; note: string }[];
  questions: { front: string; back: string }[];
};

export const timelineRounds: TimelineRound[] = [
  {
    id: 'origin',
    title: 'Nhà nước ra đời và tiêu vong như thế nào?',
    prompt: 'Sắp xếp 10 bước theo đúng tiến trình từ xã hội cộng sản nguyên thủy đến khi nhà nước tiêu vong theo quan điểm Mác – Lênin.',
    successInsight: 'Theo V.I. Lênin: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.” Nhà nước xuất hiện khi xã hội phân hóa giai cấp và sẽ tiêu vong khi không còn đối kháng giai cấp.',
    steps: [
      { label: 'Xã hội cộng sản nguyên thủy', note: 'Thị tộc, bộ lạc tự quản; chưa có tư hữu, chưa có sự phân hóa giai cấp, chưa có nhà nước.' },
      { label: 'Lực lượng sản xuất phát triển', note: 'Công cụ lao động tiến bộ, năng suất lao động tăng lên đáng kể.' },
      { label: 'Xuất hiện sản phẩm dư thừa', note: 'Lần đầu tiên trong lịch sử có sản phẩm thặng dư vượt quá nhu cầu tiêu dùng trực tiếp — tiền đề vật chất cho chế độ tư hữu.' },
      { label: 'Chế độ tư hữu', note: 'Tư liệu sản xuất và của cải dư thừa rơi vào tay một thiểu số người.' },
      { label: 'Phân hóa giai cấp', note: 'Xã hội rạn nứt thành giai cấp thống trị và giai cấp bị trị — đầu tiên là chủ nô và nô lệ.' },
      { label: 'Mâu thuẫn giai cấp không thể điều hòa', note: 'Đấu tranh giai cấp gay gắt, xã hội bất lực không thể tự giải quyết — nguyên nhân trực tiếp.' },
      { label: 'Nhà nước ra đời', note: 'Lực lượng đứng trên xã hội, giữ xung đột trong “vòng trật tự” có lợi cho giai cấp thống trị.' },
      { label: 'Thiết lập quyền lực công cộng đặc biệt', note: 'Hình thành lực lượng vũ trang (quân đội, cảnh sát) và nhà tù tách rời khỏi dân cư để trấn áp.' },
      { label: 'Phân chia dân cư theo lãnh thổ', note: 'Quản lý cư dân theo biên giới quốc gia thay vì huyết thống như thị tộc, bộ lạc.' },
      { label: 'Nhà nước tiêu vong', note: 'Khi không còn giai cấp, không còn đối kháng giai cấp và không còn nhu cầu duy trì bộ máy cưỡng chế đặc biệt, nhà nước dần tiêu vong.' },
    ],
    questions: [
      {
        front: 'Nguyên nhân sâu xa và nguyên nhân trực tiếp làm nhà nước ra đời là gì?',
        back: 'Nguyên nhân sâu xa là sự phát triển của lực lượng sản xuất làm xuất hiện của cải dư thừa, chế độ tư hữu và phân hóa giai cấp. Nguyên nhân trực tiếp là mâu thuẫn giai cấp phát triển đến mức không thể điều hòa được.',
      },
      {
        front: 'Trong xã hội cộng sản nguyên thủy đã có nhà nước chưa? Vì sao?',
        back: 'Chưa. Vì xã hội được tổ chức theo thị tộc, bộ lạc; chưa có chế độ tư hữu, chưa có sự phân hóa giai cấp nên chưa cần một bộ máy quyền lực công cộng đặc biệt.',
      },
      {
        front: 'Theo V.I. Lênin, sự tồn tại của nhà nước chứng tỏ điều gì?',
        back: 'Sự tồn tại của nhà nước chứng tỏ trong xã hội vẫn còn những mâu thuẫn giai cấp không thể điều hòa được.',
      },
      {
        front: 'Vì sao lực lượng vũ trang phải tách khỏi dân cư?',
        back: 'Khi xã hội phân hóa giai cấp, giai cấp thống trị cần một lực lượng cưỡng chế chuyên nghiệp để duy trì trật tự xã hội và bảo vệ địa vị thống trị của mình.',
      },
      {
        front: 'Phân chia dân cư theo lãnh thổ khác với tổ chức thị tộc ở điểm nào?',
        back: 'Thị tộc tổ chức theo quan hệ huyết thống; nhà nước quản lý dân cư theo lãnh thổ cư trú, không phụ thuộc quan hệ huyết thống.',
      },
      {
        front: 'Vì sao Ăngghen khẳng định nhà nước là một “phạm trù lịch sử”?',
        back: 'Nhà nước không tồn tại vĩnh viễn mà chỉ xuất hiện trong những điều kiện lịch sử nhất định khi xã hội phân hóa giai cấp và sẽ tiêu vong khi không còn đối kháng giai cấp.',
      },
      {
        front: 'Nhà nước sẽ “tiêu vong” trong điều kiện nào?',
        back: 'Khi xã hội phát triển đến giai đoạn cộng sản chủ nghĩa, không còn giai cấp, không còn đối kháng giai cấp và không còn nhu cầu duy trì bộ máy cưỡng chế đặc biệt thì nhà nước sẽ dần tiêu vong.',
      },
    ],
  },
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
        front: 'Đặc trưng nào xuất hiện trước tiên khi nhà nước ra đời?',
        back: 'Quyền lực công cộng đặc biệt — giai cấp thống trị phải thiết lập ngay bộ máy cưỡng chế (quân đội, cảnh sát) để duy trì trật tự và trấn áp khi mâu thuẫn giai cấp trở nên gay gắt.',
      },
      {
        front: 'Vì sao nhà nước cần cả ba đặc trưng?',
        back: 'Ba đặc trưng bổ sung cho nhau: quyền lực công cộng đặc biệt để cưỡng chế, quản lý theo lãnh thổ để xác định phạm vi cai trị, thuế khóa để duy trì hoạt động của bộ máy. Thiếu bất kỳ đặc trưng nào, nhà nước không thể tồn tại và vận hành.',
      },
    ],
  },
  {
    id: 'functions',
    title: 'Chức năng của nhà nước',
    prompt: 'Nối mỗi chức năng với mô tả đúng.',
    pairs: [
      { left: 'Thống trị chính trị', right: 'Dùng bộ máy quyền lực duy trì sự thống trị của giai cấp cầm quyền' },
      { left: 'Chức năng tổ chức và quản lý đời sống xã hội', right: 'Quản lý việc chung: thủy lợi, giao thông, y tế, giáo dục…' },
      { left: 'Đối nội', right: 'Quản lý các lĩnh vực chính trị, kinh tế, văn hóa và xã hội trong quốc gia' },
      { left: 'Đối ngoại', right: 'Quan hệ với các nhà nước khác, bảo vệ lãnh thổ' },
    ],
    questions: [
      {
        front: 'Chức năng thống trị chính trị là gì? Nó chiếm vai trò gì?',
        back: 'Là chức năng sử dụng bộ máy quyền lực (quân đội, cảnh sát, tòa án) để duy trì sự thống trị của giai cấp cầm quyền và đàn áp các giai cấp bị trị. Nó chiếm vai trò quyết định, vì nó quy định tính chất và hướng đi của tất cả các chức năng khác.',
      },
      {
        front: 'Chức năng tổ chức và quản lý đời sống xã hội của nhà nước bao gồm những gì?',
        back: 'Bao gồm quản lý các công việc chung của xã hội: thủy lợi, giao thông, y tế, giáo dục, bảo vệ môi trường, v.v. Nó được thực hiện dưới lăng kính giai cấp của giai cấp thống trị, nhằm duy trì xã hội trong "trật tự" có lợi cho giai cấp đó.',
      },
      {
        front: 'Mối quan hệ giữa chức năng thống trị chính trị và chức năng xã hội?',
        back: 'Chức năng thống trị chính trị lãnh đạo và quy định chức năng xã hội. Chức năng tổ chức và quản lý đời sống xã hội là cơ sở giúp nhà nước duy trì sự ổn định xã hội để tiếp tục thực hiện chức năng thống trị. Hai chức năng này luôn kết hợp mật thiết với nhau.',
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
  {
    id: 'types',
    title: 'Kiểu nhà nước ↔ giai cấp thống trị',
    prompt: 'Nối mỗi kiểu nhà nước với giai cấp nắm quyền tương ứng.',
    pairs: [
      { left: 'Nhà nước chủ nô', right: 'Sở hữu nô lệ như tư liệu sản xuất đặc biệt' },
      { left: 'Nhà nước phong kiến', right: 'Chiếm hữu ruộng đất và bóc lột địa tô' },
      { left: 'Nhà nước tư sản', right: 'Nắm giữ phần lớn tư liệu sản xuất tư bản chủ nghĩa' },
      { left: 'Nhà nước vô sản', right: 'Liên minh công nhân – nông dân và các tầng lớp lao động' },
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
];
