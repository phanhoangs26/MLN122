// src/data/chapters.ts
// Nội dung học thuật 3 chương — Hội nhập kinh tế quốc tế của Việt Nam

export interface Section {
  id: string;
  title: string;
  content: string[];
  highlight?: string; // key quote / definition
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stampLabel: string; // label hiển thị trong stamp
  sections: Section[];
}

export const chapters: Chapter[] = [
  {
    id: 'chuong-1',
    number: 'I',
    title: 'Hội nhập kinh tế quốc tế của Việt Nam',
    subtitle: 'Khái niệm, nội dung và tính tất yếu khách quan',
    stampLabel: 'KHÁI NIỆM',
    sections: [
      {
        id: 'c1-s1',
        title: 'Khái niệm và nội dung hội nhập kinh tế quốc tế',
        highlight: 'Hội nhập kinh tế quốc tế của một quốc gia là quá trình quốc gia đó thực hiện gắn kết nền kinh tế của mình với nền kinh tế thế giới dựa trên sự chia sẻ lợi ích, đồng thời tuân thủ các chuẩn mực quốc tế chung.',
        content: [
          'Hội nhập kinh tế quốc tế là một quá trình chủ động, tích cực và có chiến lược của mỗi quốc gia khi tham gia vào phân công lao động và trao đổi thương mại toàn cầu.',
          'Ba trụ cột cốt lõi của hội nhập kinh tế quốc tế:',
          '① Gắn kết thực chất: Kết nối trực tiếp, thực chất với nền kinh tế thế giới — không phải sự giao thoa hời hợt hay một chiều. Gắn kết bao gồm thương mại, đầu tư, dịch vụ, tài chính và chuỗi giá trị sản xuất.',
          '② Chia sẻ lợi ích: Quan hệ hội nhập phải dựa trên nguyên tắc cùng có lợi, bình đẳng và tôn trọng lẫn nhau — không lệ thuộc hay lợi dụng một chiều. Lợi ích có thể là kinh tế (thuế, thị trường) hoặc phi kinh tế (an ninh, uy tín).',
          '③ Tuân thủ chuẩn mực quốc tế chung: Chấp nhận "luật chơi" quốc tế đã được thừa nhận rộng rãi: các cam kết WTO, FTA, chuẩn mực lao động (ILO), môi trường, sở hữu trí tuệ (TRIPS), cạnh tranh công bằng...',
        ],
      },
      {
        id: 'c1-s2',
        title: 'Tính tất yếu khách quan của hội nhập kinh tế quốc tế',
        content: [
          'Hội nhập kinh tế quốc tế không phải lựa chọn tùy tiện mà là xu thế tất yếu của thời đại — xuất phát từ hai lý do có tính chất khách quan, không phụ thuộc ý muốn chủ quan của bất kỳ quốc gia nào.',
          'Thứ nhất — Xu thế khách quan của toàn cầu hóa kinh tế: Lực lượng sản xuất phát triển vượt ra ngoài biên giới quốc gia; phân công lao động quốc tế ngày càng sâu sắc, lôi cuốn mọi nền kinh tế vào "guồng quay" toàn cầu. Không hội nhập đồng nghĩa với việc không thể tự đảm bảo đủ điều kiện sản xuất (nguyên liệu, công nghệ, thị trường tiêu thụ) trong nước.',
          'Thứ hai — Phương thức phát triển phổ biến của các nước đang phát triển: Hội nhập mở ra cơ hội tiếp cận vốn nước ngoài (FDI, ODA), công nghệ hiện đại, kinh nghiệm quản lý tiên tiến và thị trường xuất khẩu rộng lớn. Nhờ đó, các nước đang và kém phát triển có thể rút ngắn khoảng cách phát triển so với các nước đi trước.',
          'Mặt trái cần nhận thức rõ: Hội nhập cũng mang theo rủi ro phụ thuộc nợ nước ngoài, bất bình đẳng trong trao đổi mậu dịch (các nước yếu thường chịu thiệt hơn trong đàm phán), sức ép cạnh tranh gay gắt và dễ tổn thương trước các cú sốc kinh tế toàn cầu.',
        ],
      },
    ],
  },
  {
    id: 'chuong-2',
    number: 'II',
    title: 'Nội dung hội nhập kinh tế quốc tế',
    subtitle: 'Điều kiện chuẩn bị, hình thức và mức độ hội nhập',
    stampLabel: 'NỘI DUNG',
    sections: [
      {
        id: 'c2-s1',
        title: 'Chuẩn bị điều kiện cho hội nhập',
        content: [
          'Hội nhập thành công đòi hỏi chuẩn bị toàn diện trên nhiều phương diện, không thể chỉ ký kết hiệp định mà bỏ qua năng lực nội tại:',
          '① Tư duy sẵn sàng hội nhập: Thay đổi tư duy quản lý từ "bảo hộ" sang "cạnh tranh mở" ở cấp lãnh đạo, doanh nghiệp và người dân.',
          '② Sự tham gia của toàn xã hội: Doanh nghiệp, hiệp hội ngành nghề, người lao động, giới học thuật — tất cả cần hiểu, tham gia và thích nghi.',
          '③ Thể chế hoàn thiện: Khung pháp lý minh bạch, ổn định, phù hợp với cam kết quốc tế; cải cách thủ tục hành chính, hải quan, thuế...',
          '④ Nguồn nhân lực am hiểu quốc tế: Lực lượng lao động có kỹ năng, ngoại ngữ, am hiểu luật pháp và thực tiễn kinh doanh quốc tế.',
          '⑤ Năng lực sản xuất thực: Sản phẩm hàng hóa, dịch vụ đủ sức cạnh tranh về chất lượng, giá thành và tiêu chuẩn kỹ thuật quốc tế.',
        ],
      },
      {
        id: 'c2-s2',
        title: 'Các mức độ hội nhập (thấp → cao)',
        content: [
          'Hội nhập kinh tế quốc tế diễn ra theo nhiều cấp độ từ thấp đến cao, tùy thuộc vào mức độ gắn kết và nhượng bộ chủ quyền kinh tế:',
          'PTA (Preferential Trade Agreement — Hiệp định ưu đãi thương mại): Ưu đãi thuế quan cho một số mặt hàng nhất định. Mức độ cam kết thấp nhất, từng bước mở cửa.',
          'FTA (Free Trade Agreement — Khu vực mậu dịch tự do): Xóa bỏ phần lớn thuế quan và rào cản phi thuế quan đối với hàng hóa. Đây là hình thức Việt Nam tham gia nhiều nhất.',
          'CU (Customs Union — Liên minh thuế quan): Bên cạnh FTA nội khối, các thành viên áp dụng biểu thuế quan chung thống nhất với bên ngoài khối.',
          'Thị trường chung (Common Market): Tiến xa hơn CU, bổ sung tự do lưu chuyển vốn, lao động và dịch vụ giữa các thành viên — không chỉ hàng hóa.',
          'Liên minh kinh tế – tiền tệ (Economic & Monetary Union): Mức cao nhất — thống nhất chính sách kinh tế, tài chính và sử dụng đồng tiền chung. Ví dụ điển hình: Liên minh châu Âu (EU) với đồng Euro.',
        ],
      },
      {
        id: 'c2-s3',
        title: 'Các hình thức kinh tế đối ngoại',
        content: [
          'Ngoài phân loại theo mức độ cam kết, hội nhập còn được phân loại theo lĩnh vực hoạt động kinh tế đối ngoại:',
          '① Ngoại thương (Xuất – nhập khẩu hàng hóa): Hình thức cơ bản nhất. Xuất khẩu mang về ngoại tệ, tạo việc làm; nhập khẩu cung cấp nguyên liệu, máy móc, công nghệ. Cán cân thương mại phản ánh vị thế hội nhập.',
          '② Đầu tư quốc tế: Bao gồm đầu tư trực tiếp nước ngoài (FDI — doanh nghiệp nước ngoài thành lập cơ sở sản xuất) và đầu tư gián tiếp (mua cổ phiếu, trái phiếu, quỹ đầu tư). FDI có tác động lan tỏa mạnh hơn về công nghệ và lao động.',
          '③ Hợp tác quốc tế về khoa học – công nghệ: Chuyển giao công nghệ, nghiên cứu liên kết, học bổng đào tạo, hợp tác giáo dục đại học, trao đổi chuyên gia. Đây là con đường rút ngắn khoảng cách công nghệ.',
          '④ Dịch vụ thu ngoại tệ: Du lịch quốc tế, xuất khẩu lao động (kiều hối), vận tải và logistics quốc tế, dịch vụ tài chính – ngân hàng – bảo hiểm xuyên biên giới.',
        ],
      },
    ],
  },
  {
    id: 'chuong-3',
    number: 'III',
    title: 'Liên hệ thực tiễn Việt Nam',
    subtitle: 'Thành tựu, thách thức và hành trình hội nhập',
    stampLabel: 'THỰC TIỄN',
    sections: [
      {
        id: 'c3-s1',
        title: 'Từ Đổi mới 1986 đến mở cửa hội nhập',
        content: [
          'Đại hội Đảng VI (1986) đánh dấu bước ngoặt lịch sử: Việt Nam chuyển từ cơ chế kế hoạch hóa tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa, chủ động mở cửa và hội nhập quốc tế.',
          'Xuyên suốt các kỳ Đại hội tiếp theo, chủ trương hội nhập kinh tế quốc tế luôn được khẳng định như một bộ phận của đường lối đổi mới, không bao giờ ngắt đoạn hay đảo ngược.',
          'Đến nay, Việt Nam là một trong những nền kinh tế có độ mở rất cao trên thế giới — kim ngạch xuất nhập khẩu thường xuyên vượt GDP (tỷ lệ thương mại/GDP đạt trên 200% những năm gần đây), phản ánh sự gắn kết sâu sắc với kinh tế toàn cầu.',
        ],
      },
      {
        id: 'c3-s2',
        title: 'Bốn trụ cột hội nhập của Việt Nam',
        content: [
          'a) Gia nhập tổ chức kinh tế quốc tế:',
          '• ASEAN (1995): Việt Nam gia nhập Hiệp hội các quốc gia Đông Nam Á, tham gia Khu vực mậu dịch tự do ASEAN (AFTA), mở ra thị trường 680 triệu dân.',
          '• APEC (1998): Diễn đàn hợp tác kinh tế châu Á – Thái Bình Dương, kết nối 21 nền kinh tế chiếm 60% GDP toàn cầu.',
          '• WTO (11/1/2007 — thành viên thứ 150): Việt Nam gia nhập Tổ chức Thương mại Thế giới sau 11 năm đàm phán, cam kết mở cửa thị trường hàng hóa và dịch vụ theo chuẩn WTO.',
          'b) Tham gia các Hiệp định thương mại tự do (FTA):',
          '• Đi cùng ASEAN: AFTA, ACFTA (ASEAN–Trung Quốc), AJCEP (ASEAN–Nhật Bản), AKFTA (ASEAN–Hàn Quốc), AANZFTA (ASEAN–Australia–New Zealand).',
          '• Song phương: VJEPA (Việt Nam–Nhật Bản), VKFTA (Việt Nam–Hàn Quốc), FTA với Chile, EAEU (Liên minh kinh tế Á–Âu).',
          '• Thế hệ mới, tiêu chuẩn cao: CPTPP (hiệu lực 14/1/2019), EVFTA — Hiệp định Việt Nam–EU (hiệu lực 1/8/2020), UKVFTA (Việt Nam–Anh), RCEP (hiệu lực 1/1/2022).',
          'c) Thu hút đầu tư trực tiếp nước ngoài (FDI):',
          'Các tập đoàn hàng đầu thế giới đã chọn Việt Nam làm cứ điểm sản xuất: Samsung (điện tử), Intel (bán dẫn), LG (điện tử tiêu dùng), Canon (thiết bị văn phòng), Foxconn (linh kiện Apple), LEGO (đồ chơi), Bosch (thiết bị công nghiệp)... Làn sóng FDI tạo hàng triệu việc làm, thúc đẩy chuyển giao công nghệ và phát triển công nghiệp hỗ trợ.',
          'd) Tham gia chuỗi giá trị toàn cầu:',
          'Việt Nam đã chen chân vào chuỗi giá trị toàn cầu trong nhiều ngành: điện tử (xuất khẩu số 1 theo kim ngạch), dệt may – da giày (top 3 thế giới), đồ gỗ nội thất, thủy sản, gạo, cà phê, hạt điều, hồ tiêu.',
        ],
      },
      {
        id: 'c3-s3',
        title: 'Thành tựu nổi bật',
        content: [
          'Sau hơn 35 năm hội nhập, Việt Nam ghi nhận nhiều thành tựu đáng ghi nhận:',
          '• Kim ngạch xuất nhập khẩu tăng mạnh liên tục, đưa Việt Nam vào nhóm các nền kinh tế thương mại lớn của khu vực.',
          '• Vị trí hàng đầu toàn cầu trong xuất khẩu: điện tử (top 10), gạo (top 3), cà phê robusta (top 1), hạt điều (top 1), hồ tiêu (top 1), thủy sản (top 5), dệt may (top 3).',
          '• Thu hút vốn FDI ổn định và gia tăng — hàng chục tỷ USD mỗi năm, đặc biệt trong lĩnh vực công nghệ cao.',
          '• Hệ thống pháp luật kinh tế tiệm cận dần chuẩn mực quốc tế: Luật Sở hữu trí tuệ, Luật Cạnh tranh, Luật Thương mại, Luật Đầu tư... được cải cách liên tục.',
          '• Năng lực cạnh tranh của doanh nghiệp Việt Nam được cải thiện; một số thương hiệu nội địa vươn ra thị trường quốc tế.',
          '• Vị thế và uy tín quốc tế của Việt Nam được nâng cao — thành viên tích cực của ASEAN, WTO, APEC; ứng viên và thành viên Hội đồng Bảo an Liên Hợp Quốc.',
        ],
      },
      {
        id: 'c3-s4',
        title: 'Thách thức còn tồn tại',
        content: [
          'Hội nhập cũng đặt ra những thách thức nghiêm trọng cần nhìn nhận thẳng thắn:',
          '• Cạnh tranh gay gắt ngay trên sân nhà: Hàng hóa nhập khẩu giá rẻ (đặc biệt từ Trung Quốc, Thái Lan) cạnh tranh trực tiếp với doanh nghiệp nội địa.',
          '• Doanh nghiệp vừa và nhỏ còn yếu: Hạn chế về vốn, công nghệ sản xuất, năng lực quản trị và hiểu biết luật pháp quốc tế, khó tận dụng triệt để ưu đãi FTA.',
          '• Phụ thuộc vào đầu vào nhập khẩu: Nhiều ngành sản xuất chủ lực (dệt may, điện tử, da giày) phụ thuộc cao vào nguyên liệu, linh kiện nhập khẩu — giá trị gia tăng nội địa còn thấp.',
          '• Dễ tổn thương trước biến động toàn cầu: Với độ mở kinh tế rất cao, Việt Nam rất nhạy cảm với suy thoái kinh tế thế giới, biến động tỷ giá, xung đột thương mại và đứt gãy chuỗi cung ứng.',
          '• Khu vực FDI chiếm tỷ trọng lớn: Xuất khẩu của khu vực FDI chiếm trên 70% tổng kim ngạch, tạo ra sự mất cân bằng và phụ thuộc về cơ cấu.',
        ],
      },
    ],
  },
];

export const totalSections = chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
