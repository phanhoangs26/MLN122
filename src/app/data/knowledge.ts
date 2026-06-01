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
    id: 'product_of_conflict',
    question: 'Nhà nước là sản phẩm của mâu thuẫn giai cấp nghĩa là gì? (Tại sao?)',
    keywords: ['sản phẩm của mâu thuẫn giai cấp', 'sản phẩm', 'nghĩa là gì', 'tại sao'],
    answer:
      'Nhà nước không tồn tại từ đầu trong lịch sử loài người. Nó xuất hiện khi xã hội phân hóa thành các giai cấp đối kháng do chế độ tư hữu và sự bất bình đẳng về kinh tế. Khi các mâu thuẫn đó trở nên gay gắt, không thể tự giải quyết, nhà nước ra đời như một kết quả lịch sử của quá trình đó. Vì vậy nhà nước là sản phẩm của mâu thuẫn giai cấp không thể điều hòa được.',
  },
  {
    id: 'expression_of_conflict',
    question: 'Nhà nước là biểu hiện của mâu thuẫn giai cấp nghĩa là gì?',
    keywords: ['biểu hiện của mâu thuẫn giai cấp', 'biểu hiện', 'nghĩa là gì'],
    answer:
      'Sự tồn tại của nhà nước cho thấy trong xã hội vẫn tồn tại các giai cấp có lợi ích đối lập nhau. Nhà nước sử dụng pháp luật, bộ máy hành chính và các công cụ cưỡng chế để duy trì trật tự xã hội theo lợi ích của giai cấp thống trị. Do đó nhà nước phản ánh và biểu hiện trực tiếp các mâu thuẫn giai cấp trong xã hội.',
  },
  {
    id: 'proof_of_state',
    question: 'Sự tồn tại của nhà nước chứng tỏ điều gì?',
    keywords: ['chứng tỏ điều gì', 'chứng tỏ', 'sự tồn tại của nhà nước chứng tỏ'],
    answer:
      'Theo Lênin, sự tồn tại của nhà nước chứng tỏ những mâu thuẫn giai cấp trong xã hội vẫn chưa được giải quyết và chưa thể điều hòa. Nếu các mâu thuẫn đó không còn tồn tại thì nhà nước với tư cách là công cụ duy trì sự thống trị giai cấp cũng sẽ mất đi cơ sở tồn tại của mình.',
  },
  {
    id: 'class_emergence',
    question: 'Giai cấp xuất hiện như thế nào?',
    keywords: ['giai cấp xuất hiện', 'giai cấp ra đời', 'xuất hiện như thế nào', 'nguồn gốc giai cấp'],
    answer:
      'Giai cấp xuất hiện khi lực lượng sản xuất phát triển dẫn đến của cải dư thừa, từ đó chế độ tư hữu ra đời. Sự xuất hiện chế độ tư hữu phá vỡ tính bình đẳng của xã hội nguyên thủy, phân hóa xã hội thành những tập đoàn người có địa vị kinh tế khác nhau: giai cấp thống trị (chiếm đoạt tư liệu sản xuất) và giai cấp bị trị.',
  },
  {
    id: 'class_conflict_def',
    question: 'Mâu thuẫn giai cấp là gì? Thế nào là không thể điều hòa?',
    keywords: ['mâu thuẫn giai cấp là gì', 'thế nào là không thể điều hòa', 'không thể điều hòa là gì'],
    answer:
      'Mâu thuẫn giai cấp là sự đối lập về lợi ích kinh tế cơ bản giữa các tập đoàn người trong xã hội. Mâu thuẫn "không thể điều hòa" nghĩa là lợi ích giữa giai cấp bóc lột và bị bóc lột hoàn toàn đối kháng, gay gắt đến mức không thể tự thỏa hiệp hay dung hòa bằng các biện pháp thông thường, buộc phải có một lực lượng cưỡng chế (nhà nước) để giữ xã hội trong "trật tự".',
  },
  {
    id: 'neutral_state',
    question: 'Nhà nước có đứng trên các giai cấp hay trung lập không?',
    keywords: ['đứng trên giai cấp', 'trung lập', 'nhà nước có trung lập', 'đứng ngoài'],
    answer:
      'Không. Nhà nước không bao giờ trung lập hay đứng ngoài giai cấp. Nó luôn mang bản chất của giai cấp thống trị về kinh tế. Giai cấp nào nắm giữ tư liệu sản xuất chủ yếu sẽ lập ra nhà nước để bảo vệ lợi ích của mình. Tuy nhiên, nhà nước thường mang bộ mặt nhân danh toàn xã hội để che giấu bản chất giai cấp.',
  },
  {
    id: 'meaning_today',
    question: 'Luận điểm của Lênin còn ý nghĩa gì đối với xã hội hiện nay?',
    keywords: ['ý nghĩa', 'hiện nay', 'xã hội hiện nay', 'còn ý nghĩa', 'giá trị'],
    answer:
      'Luận điểm của Lênin vẫn còn nguyên giá trị. Nó là vũ khí lý luận sắc bén giúp ta nhận diện bản chất bóc lột của các nhà nước tư bản hiện đại. Dù các nhà nước tư sản ngày nay có điều chỉnh phúc lợi hay đề cao "dân chủ", bản chất thực sự của chúng vẫn là công cụ bảo vệ lợi ích cho giai cấp tư sản độc quyền trước sự đấu tranh của nhân dân lao động.',
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
    id: 'us_state',
    question: 'Bản chất chính quyền của nước Mỹ hiện tại là gì?',
    keywords: ['mỹ', 'hoa kỳ', 'nước mỹ', 'chính quyền mỹ', 'chính phủ mỹ'],
    answer:
      'Nước Mỹ (Hoa Kỳ) hiện nay là một nhà nước tư sản, được tổ chức theo hình thức cộng hòa tổng thống. Dù mang hình thức dân chủ tư sản với hệ thống bầu cử đa đảng, nhưng về bản chất triết học Mác - Lênin, nó vẫn là nền chuyên chính tư sản, công cụ bảo vệ lợi ích của các tập đoàn tư bản và giai cấp tư sản độc quyền.',
  },
  {
    id: 'modern_capitalism',
    question: 'Nhà nước tư sản hiện đại có thay đổi bản chất không?',
    keywords: ['tư sản hiện đại', 'tư sản ngày nay', 'hiện nay', 'thay đổi bản chất', 'phúc lợi'],
    answer:
      'Dù ngày nay nhà nước tư sản có nhiều điều chỉnh (như tăng cường phúc lợi xã hội, cải thiện đời sống người lao động, mở rộng dân chủ), nhưng bản chất vẫn không đổi: đó là tổ chức quyền lực của giai cấp tư sản, nhằm duy trì trật tự tư bản chủ nghĩa, bảo vệ chế độ tư hữu và bóc lột giá trị thặng dư.',
  },
  {
    id: 'law_state',
    question: 'Thế nào là nhà nước pháp quyền?',
    keywords: ['pháp quyền', 'nhà nước pháp quyền', 'thượng tôn pháp luật'],
    answer:
      'Nhà nước pháp quyền là nhà nước quản lý xã hội bằng pháp luật, trong đó pháp luật giữ vị trí tối thượng (thượng tôn pháp luật), mọi tổ chức và cá nhân đều phải tuân thủ. Ở Việt Nam, đó là Nhà nước pháp quyền XHCN, nơi pháp luật thể hiện ý chí của giai cấp công nhân và nhân dân lao động.',
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
  {
    id: 'viewpoints',
    question: 'Có những quan điểm nào về nhà nước trong lịch sử?',
    keywords: ['quan điểm', 'mácxít', 'ngoài mácxít', 'cách hiểu'],
    answer:
      'Có hai quan điểm chính: quan điểm ngoài mácxít và quan điểm mácxít. Các quan điểm ngoài mácxít thường giải thích không đúng, không đầy đủ do hạn chế lịch sử hoặc lợi ích giai cấp. Quan điểm mácxít vận dụng duy vật biện chứng, khẳng định nhà nước là hiện tượng lịch sử mang bản chất giai cấp, đạt được tính khách quan, khoa học.',
  },
  {
    id: 'sparta_athens',
    question: 'Nhà nước Xpác và Aten thuộc kiểu hình thức nào?',
    keywords: ['xpác', 'aten', 'hy lạp', 'thành bang', 'sparta', 'athens'],
    answer:
      'Nhà nước thành bang Xpác (Sparta) ở Hy Lạp cổ đại là điển hình của hình thức quân chủ chủ nô (quyền lực trong tay hoàng đế, cha truyền con nối). Nhà nước thành bang Aten (Athens) là điển hình của cộng hòa dân chủ chủ nô (quyền lực thuộc về Hội đồng trưởng lão do công dân bầu ra). Dù khác nhau, cả hai đều là công cụ thống trị của giai cấp chủ nô.',
  },
  {
    id: 'feudal_forms',
    question: 'Nhà nước phong kiến tập quyền và phân quyền khác nhau như thế nào?',
    keywords: ['phong kiến tập quyền', 'tập quyền', 'phân quyền', 'cát cứ', 'vua', 'hoàng đế'],
    answer:
      'Trong nhà nước phong kiến tập quyền, quyền lực tập trung tuyệt đối vào tay chính quyền trung ương, đứng đầu là vua, hoàng đế. Trong nhà nước phong kiến phân quyền, quyền lực bị phân tán bởi các thế lực phong kiến cát cứ ở địa phương, chính quyền trung ương chỉ tồn tại trên danh nghĩa, vua chỉ là bù nhìn.',
  },
  {
    id: 'func_relation',
    question: 'Mối quan hệ giữa chức năng thống trị chính trị và chức năng xã hội?',
    keywords: ['quan hệ', 'thống trị chính trị và chức năng xã hội', 'chức năng chính trị và xã hội', 'cơ sở'],
    answer:
      'Hai chức năng này có mối quan hệ hữu cơ. Chức năng thống trị chính trị giữ vai trò quyết định, chi phối và định hướng. Tuy nhiên, chức năng xã hội lại là CƠ SỞ của sự thống trị chính trị. Ph. Ăngghen cho rằng sự thống trị chính trị chỉ kéo dài chừng nào nhà nước còn thực hiện tốt chức năng xã hội (duy trì trật tự, thủy lợi, giao thông...). Nếu bỏ qua chức năng xã hội, nhà nước sớm muộn sẽ sụp đổ.',
  },
  {
    id: 'foreign_relation',
    question: 'Mối quan hệ giữa chức năng đối nội và đối ngoại của nhà nước là gì?',
    keywords: ['đối nội', 'đối ngoại', 'mối quan hệ', 'quan hệ'],
    answer:
      'Chức năng đối nội và đối ngoại là hai mặt của một thực thể thống nhất, hỗ trợ lẫn nhau. Trong đó, chức năng đối nội giữ vai trò CHỦ YẾU. Có làm tốt chức năng đối nội (ổn định xã hội, phát triển kinh tế) thì mới có điều kiện thực hiện tốt chức năng đối ngoại. Ngược lại, chức năng đối ngoại tốt sẽ tạo điều kiện nâng cao vị thế, thúc đẩy phát triển đối nội.',
  },
  {
    id: 'product_and_expression',
    question: 'Tại sao Lênin dùng cả hai từ "sản phẩm" và "biểu hiện"? Bỏ một từ được không?',
    keywords: ['cả hai từ', 'bỏ từ', 'thiếu một từ', 'sản phẩm và biểu hiện', 'sản phẩm hay biểu hiện'],
    answer:
      'Lênin dùng cả hai từ vì chúng bổ sung cho nhau, không thể bỏ từ nào. "Sản phẩm" chỉ nguồn gốc quá khứ (nhà nước sinh ra từ đâu: từ mâu thuẫn giai cấp). "Biểu hiện" chỉ thực trạng hiện tại (nhà nước đang phản ánh điều gì: phản ánh mâu thuẫn giai cấp vẫn đang tồn tại). Thiếu "sản phẩm", ta không rõ cội nguồn. Thiếu "biểu hiện", ta không thấy được bản chất áp bức vẫn đang tiếp diễn.',
  },
  {
    id: 'no_agreement',
    question: 'Tại sao các giai cấp không thể tự thỏa thuận với nhau mà phải cần nhà nước?',
    keywords: ['thỏa thuận', 'tự thỏa thuận', 'dàn xếp', 'cần một lực lượng đứng trên'],
    answer:
      'Vì mâu thuẫn giai cấp là đối kháng về lợi ích kinh tế cốt lõi (kẻ bóc lột và người bị bóc lột). Lợi ích này triệt tiêu lẫn nhau nên không thể tự thỏa thuận hay dung hòa. Nếu không có một lực lượng bạo lực "đứng trên xã hội" (nhà nước) để áp đặt trật tự, các giai cấp sẽ tiêu diệt lẫn nhau trong các cuộc xung đột, dẫn đến sự sụp đổ của toàn bộ xã hội.',
  },
  {
    id: 'resolve_conflict',
    question: 'Nếu mâu thuẫn giai cấp được giải quyết thì nhà nước có còn không?',
    keywords: ['giải quyết', 'hết mâu thuẫn', 'không còn mâu thuẫn', 'nhà nước còn không'],
    answer:
      'Không. Theo logic của Lênin, nhà nước là công cụ để quản lý mâu thuẫn giai cấp. Khi xã hội tiến lên giai đoạn cộng sản chủ nghĩa, không còn chế độ tư hữu, không còn giai cấp, tức là mâu thuẫn giai cấp đã bị triệt tiêu, thì nhà nước sẽ mất đi lý do tồn tại và tự "tiêu vong".',
  },
  {
    id: 'protect_everyone',
    question: 'Nếu nhà nước bảo vệ trật tự chung thì tại sao nói nó phục vụ giai cấp thống trị?',
    keywords: ['bảo vệ trật tự', 'bảo vệ mọi người', 'trật tự chung', 'phục vụ toàn xã hội'],
    answer:
      'Nhà nước bảo vệ "trật tự chung" thực chất là bảo vệ trật tự có lợi cho giai cấp thống trị. Để duy trì sự thống trị lâu dài, nó buộc phải thực hiện một số chức năng xã hội (cầu đường, y tế...). Nhưng chức năng xã hội chỉ là phương tiện, là "lớp vỏ" che đậy bản chất giai cấp, mục đích cuối cùng vẫn là bảo vệ quyền tư hữu và chế độ bóc lột của giai cấp cầm quyền.',
  },
  {
    id: 'modern_democracy',
    question: 'Nhà nước dân chủ hiện đại, có phúc lợi xã hội có phủ nhận luận điểm Lênin không?',
    keywords: ['dân chủ hiện đại', 'phúc lợi xã hội', 'phủ nhận', 'làm mất bản chất', 'bác bỏ'],
    answer:
      'Không. Dân chủ đa đảng hay phúc lợi xã hội cao ở các nước tư bản hiện đại chỉ là những điều chỉnh chiến thuật nhằm xoa dịu mâu thuẫn giai cấp, tránh các cuộc cách mạng bùng nổ. Đằng sau lớp vỏ dân chủ đó, các tập đoàn tư bản độc quyền vẫn nắm giữ kinh tế và chi phối bộ máy chính trị. Bản chất chuyên chính tư sản vẫn không thay đổi.',
  },
  {
    id: 'army_police',
    question: 'Bộ máy quân đội, cảnh sát, tòa án, pháp luật, thuế khóa phản ánh điều gì?',
    keywords: ['quân đội', 'cảnh sát', 'tòa án', 'pháp luật', 'thuế khóa', 'phản ánh điều gì'],
    answer:
      'Đó là biểu hiện vật chất của quyền lực nhà nước, chứng minh mâu thuẫn giai cấp là không thể điều hòa. Giai cấp thống trị không thể cai trị chỉ bằng thuyết phục, mà phải dùng bạo lực cưỡng chế (quân đội, cảnh sát), áp đặt ý chí thành luật (pháp luật) và bóc lột hợp pháp (thuế) để duy trì trật tự bóc lột.',
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
export function answerFromKB(query: string, history: {role: string, text: string}[] = []): KbResult {
  let q = normalize(query);
  
  // Nếu câu hỏi quá ngắn (ví dụ: "tại sao", "vậy á"), lấy thêm context từ câu hỏi gần nhất
  if (q.split(' ').length <= 3 && history.length >= 2) {
    // Tìm câu hỏi user gần nhất
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role === 'user') {
        q = normalize(history[i].text) + ' ' + q;
        break;
      }
    }
  }

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
