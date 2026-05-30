// Kho tri thức cho chatbox — soạn từ Chương III: "Nhà nước và Cách mạng xã hội".
// Dùng cho chế độ offline (tìm câu trả lời khớp theo từ khóa) và làm ngữ cảnh
// (context) khi bật chế độ gọi API LLM.

export type KbEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const knowledgeBase: KbEntry[] = [
  {
    id: 'origin',
    question: 'Nhà nước ra đời từ đâu / khi nào?',
    keywords: ['nguồn gốc', 'ra đời', 'xuất hiện', 'sinh ra', 'hình thành', 'từ đâu', 'khi nào'],
    answer:
      'Nhà nước là một phạm trù lịch sử, chỉ ra đời khi xã hội phát triển tới một giai đoạn nhất định. Nguyên nhân sâu xa là lực lượng sản xuất phát triển → của cải dư thừa → xuất hiện chế độ tư hữu. Nguyên nhân trực tiếp là mâu thuẫn giai cấp gay gắt, không thể điều hòa được. Cuộc đấu tranh đầu tiên giữa chủ nô và nô lệ dẫn tới nhà nước đầu tiên.',
  },
  {
    id: 'primitive',
    question: 'Xã hội nguyên thủy có nhà nước không?',
    keywords: ['nguyên thủy', 'thị tộc', 'bộ lạc', 'công xã', 'chưa có nhà nước', 'tự quản'],
    answer:
      'Không. Trong xã hội cộng sản nguyên thủy chưa có chế độ tư hữu, chưa phân chia giai cấp nên chưa có nhà nước. Xã hội vận hành theo thể chế tự quản của thị tộc, bộ lạc; quyền lực mang tính xã hội, gắn với cộng đồng, chưa tách rời khỏi dân cư.',
  },
  {
    id: 'irreconcilable',
    question: 'Luận điểm của Lênin về nhà nước là gì?',
    keywords: ['lênin', 'lenin', 'luận điểm', 'điều hòa', 'mâu thuẫn giai cấp', 'không thể', 'sản phẩm', 'biểu hiện'],
    answer:
      'V.I. Lênin khẳng định: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.” Ở đâu, lúc nào mà mâu thuẫn giai cấp không thể điều hòa thì nhà nước xuất hiện; và ngược lại, sự tồn tại của nhà nước chứng tỏ mâu thuẫn giai cấp là không thể điều hòa.',
  },
  {
    id: 'essence',
    question: 'Bản chất của nhà nước là gì?',
    keywords: ['bản chất', 'công cụ', 'chuyên chính', 'trấn áp', 'thống trị', 'là gì'],
    answer:
      'Về bản chất, nhà nước là một tổ chức chính trị của giai cấp thống trị về kinh tế, dùng để trấn áp các giai cấp khác và bảo vệ trật tự có lợi cho mình. Theo Ăngghen, nhà nước “chẳng qua chỉ là một bộ máy của một giai cấp này dùng để trấn áp một giai cấp khác”. Không có nhà nước đứng trên hay đứng ngoài giai cấp.',
  },
  {
    id: 'features',
    question: 'Ba đặc trưng cơ bản của nhà nước?',
    keywords: ['đặc trưng', 'ba đặc trưng', '3 đặc trưng', 'lãnh thổ', 'quyền lực công cộng', 'thuế'],
    answer:
      'Nhà nước có ba đặc trưng cơ bản: (1) Quản lý cư dân theo lãnh thổ (phân chia dân cư theo lãnh thổ, hình thành biên giới quốc gia); (2) Có quyền lực công cộng đặc biệt mang tính cưỡng chế — quân đội, cảnh sát, nhà tù, tòa án — tách rời khỏi dân cư; (3) Đặt ra và thu thuế để nuôi bộ máy nhà nước.',
  },
  {
    id: 'power',
    question: 'Quyền lực công cộng đặc biệt gồm những gì?',
    keywords: ['quân đội', 'cảnh sát', 'nhà tù', 'tòa án', 'cưỡng chế', 'bộ máy', 'vũ trang'],
    answer:
      'Đó là hệ thống cơ quan quyền lực chuyên nghiệp mang tính cưỡng chế: những đội vũ trang đặc biệt (quân đội nhà nghề, cảnh sát), nhà tù, tòa án và các cơ quan hành chính. Nhà nước quản lý xã hội chủ yếu bằng pháp luật, buộc mọi cá nhân, tổ chức phục tùng ý chí của giai cấp cầm quyền.',
  },
  {
    id: 'functions',
    question: 'Các chức năng cơ bản của nhà nước?',
    keywords: ['chức năng', 'thống trị chính trị', 'chức năng xã hội', 'đối nội', 'đối ngoại'],
    answer:
      'Nhà nước có chức năng thống trị chính trị (dùng bộ máy quyền lực duy trì sự thống trị giai cấp) và chức năng xã hội (quản lý việc chung: thủy lợi, giao thông, y tế, giáo dục...). Ngoài ra còn chức năng đối nội và đối ngoại. Chức năng thống trị chính trị giữ vai trò quyết định, nhưng chức năng xã hội là cơ sở của sự thống trị chính trị.',
  },
  {
    id: 'types',
    question: 'Có mấy kiểu nhà nước trong lịch sử?',
    keywords: ['kiểu nhà nước', 'mấy kiểu', 'bốn kiểu', '4 kiểu', 'chủ nô', 'phong kiến', 'tư sản', 'vô sản'],
    answer:
      'Lịch sử đã tồn tại bốn kiểu nhà nước: nhà nước chủ nô, nhà nước phong kiến, nhà nước tư sản và nhà nước vô sản. Ba kiểu đầu đều là công cụ thống trị của thiểu số giai cấp bóc lột. Nhà nước vô sản là kiểu “đặc biệt” — nhà nước của số đông thống trị số ít.',
  },
  {
    id: 'forms',
    question: 'Hình thức nhà nước là gì?',
    keywords: ['hình thức', 'tập quyền', 'phân quyền', 'quân chủ', 'cộng hòa', 'lập hiến'],
    answer:
      'Hình thức nhà nước là cách thức tổ chức và phương thức thực hiện quyền lực của giai cấp thống trị. Ví dụ: nhà nước chủ nô có quân chủ và cộng hòa dân chủ chủ nô; nhà nước phong kiến có tập quyền và phân quyền; nhà nước tư sản có cộng hòa tổng thống, cộng hòa đại nghị, quân chủ lập hiến... Dù khác hình thức, bản chất nhà nước tư sản đều là nền chuyên chính tư sản.',
  },
  {
    id: 'proletarian',
    question: 'Nhà nước vô sản là gì?',
    keywords: ['vô sản', 'chuyên chính vô sản', 'quá độ', 'số đông', 'công nhân'],
    answer:
      'Nhà nước vô sản là kiểu nhà nước “đặc biệt”, nhà nước của số đông thống trị số ít, do giai cấp công nhân lãnh đạo liên minh với nông dân và trí thức. Theo C. Mác, nhà nước của thời kỳ quá độ là nền chuyên chính cách mạng của giai cấp vô sản. Nó có chức năng tổ chức xây dựng xã hội mới và trấn áp sự phản kháng của các thế lực chống đối.',
  },
  {
    id: 'wither',
    question: 'Khi nào nhà nước tiêu vong?',
    keywords: ['tiêu vong', 'mất đi', 'biến mất', 'cộng sản chủ nghĩa', 'không còn giai cấp'],
    answer:
      'Theo quan điểm mácxít, khi xã hội đạt tới giai đoạn cộng sản chủ nghĩa, không còn giai cấp, xã hội vận hành theo nguyên tắc “tự giác”, thì nhà nước sẽ “tự tiêu vong”. Nhà nước tiêu vong dần chứ không bị xóa bỏ bằng một sắc lệnh.',
  },
  {
    id: 'vietnam',
    question: 'Bản chất Nhà nước Việt Nam hiện nay?',
    keywords: ['bản chất nhà nước việt nam', 'nhà nước việt nam hiện nay', 'việt nam hiện nay', 'việt nam', 'pháp quyền', 'của dân', 'do dân', 'vì dân', 'đảng lãnh đạo', 'nhân dân làm chủ'],
    answer:
      'Nhà nước Cộng hòa XHCN Việt Nam là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân; vận hành theo nguyên tắc “Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ”. Tất cả quyền lực nhà nước thuộc về Nhân dân, nền tảng là liên minh giai cấp công nhân – nông dân – đội ngũ trí thức. Mục tiêu: dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
  },
  {
    id: 'engels',
    question: 'Ăngghen viết tác phẩm nào về nhà nước?',
    keywords: ['ăngghen', 'angghen', 'tác phẩm', 'nguồn gốc của gia đình'],
    answer:
      'Ph. Ăngghen trình bày nguồn gốc nhà nước trong tác phẩm “Nguồn gốc của gia đình, của chế độ tư hữu và của nhà nước” (1884). V.I. Lênin kế thừa và phát triển trong “Nhà nước và Cách mạng” (1917).',
  },
  {
    id: 'revolution',
    question: 'Cách mạng xã hội là gì?',
    keywords: ['cách mạng xã hội', 'cách mạng', 'tình thế cách mạng', 'bạo lực', 'lực lượng sản xuất', 'quan hệ sản xuất'],
    answer:
      'Cách mạng xã hội là sự thay đổi căn bản về chất của một hình thái kinh tế - xã hội, bước chuyển lên hình thái mới tiến bộ hơn. Nguồn gốc sâu xa là mâu thuẫn giữa lực lượng sản xuất tiến bộ và quan hệ sản xuất lỗi thời; trong xã hội có giai cấp, đấu tranh giai cấp là nguyên nhân trực tiếp. Cách mạng nổ ra khi có tình thế cách mạng và nhân tố chủ quan chín muồi.',
  },
];

export const suggestedQuestions = [
  'Nhà nước ra đời khi nào?',
  'Bản chất của nhà nước là gì?',
  'Có mấy kiểu nhà nước?',
  'Bản chất Nhà nước Việt Nam hiện nay?',
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFC')
    .replace(/[.,?!;:()"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type KbResult = { answer: string; matched?: KbEntry; score: number };

// Tìm câu trả lời tốt nhất theo độ trùng từ khóa.
export function answerFromKB(query: string): KbResult {
  const q = normalize(query);
  if (!q) return { answer: 'Bạn hãy nhập một câu hỏi về chủ đề nhà nước nhé.', score: 0 };

  let best: KbEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(normalize(kw))) score += kw.split(' ').length; // cụm dài hơn = trọng số cao hơn
    }
    // cộng điểm nếu trùng từ trong câu hỏi mẫu
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return { answer: best.answer, matched: best, score: bestScore };
  }

  return {
    answer:
      'Mình chỉ trả lời quanh chủ đề “Nhà nước” (Chương III). Bạn thử hỏi về: nguồn gốc, bản chất, đặc trưng, chức năng, các kiểu nhà nước, nhà nước tiêu vong, hoặc Nhà nước pháp quyền XHCN Việt Nam.',
    score: 0,
  };
}

// Ghép ngữ cảnh để gửi cho LLM khi bật chế độ API.
export function buildContext(): string {
  return knowledgeBase.map((e) => `• ${e.question}\n${e.answer}`).join('\n\n');
}
