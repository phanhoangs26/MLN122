export type DebateQuestion = {
  id: string;
  claim: string;
  expected_points: string[];
  source_chunk: string;
};

export const debateRounds: DebateQuestion[] = [
  {
    id: 'q01',
    claim: 'Nhà nước tư bản hiện đại có hệ thống phúc lợi xã hội rất tốt, vậy nó đã trở thành nhà nước của toàn dân, không còn mang bản chất bóc lột nữa.',
    expected_points: [
      'Phúc lợi xã hội chỉ là chức năng xã hội, dùng để làm dịu mâu thuẫn giai cấp, bảo vệ trật tự hiện hành.',
      'Bản chất vẫn là công cụ thống trị của giai cấp tư sản (chức năng thống trị chính trị giữ vai trò quyết định).',
      'Không có nhà nước nào đứng ngoài giai cấp.'
    ],
    source_chunk: 'Chức năng xã hội của nhà nước được biểu hiện ở chỗ... để duy trì sự ổn định của xã hội trong "trật tự" theo quan điểm của giai cấp thống trị... chức năng thống trị chính trị của nhà nước giữ vai trò quyết định, chi phối và định hướng chức năng xã hội.'
  },
  {
    id: 'q02',
    claim: 'Vì sự phát triển của sản xuất làm của cải dư thừa, nhà nước đương nhiên sinh ra để quản lý tài sản chung chứ không liên quan đến bóc lột giai cấp.',
    expected_points: [
      'Lực lượng sản xuất phát triển tạo của cải dư thừa là nguyên nhân sâu xa dẫn đến tư hữu.',
      'Nguyên nhân trực tiếp ra đời nhà nước là mâu thuẫn giai cấp gay gắt không thể điều hòa.',
      'Nhà nước sinh ra để duy trì trật tự có lợi cho giai cấp thống trị, đàn áp sự nổi dậy của giai cấp bị trị.'
    ],
    source_chunk: 'Nguyên nhân sâu xa của sự xuất hiện nhà nước là do sự phát triển của lực lượng sản xuất dẫn đến sự dư thừa tương đối của cải, xuất hiện chế độ tư hữu... nguyên nhân trực tiếp dẫn tới sự xuất hiện nhà nước là do mâu thuẫn giai cấp trong xã hội gay gắt không thể điều hòa được.'
  },
  {
    id: 'q03',
    claim: 'Pháp luật trong nhà nước sinh ra là để bảo vệ công bằng cho tất cả mọi người, do đó nhà nước đứng ở vị trí trung lập hòa giải.',
    expected_points: [
      'Pháp luật là công cụ để cưỡng bức mọi cá nhân thực hiện chính sách có lợi cho giai cấp thống trị.',
      'Quyền lực nhà nước không thuộc về nhân dân (ở các nhà nước bóc lột) mà thuộc về giai cấp thống trị.',
      'Nhà nước là một bộ máy trấn áp, nó hợp pháp hóa và củng cố sự áp bức bằng cách làm dịu xung đột.'
    ],
    source_chunk: 'Nhà nước quản lý xã hội dựa vào pháp luật là chủ yếu. Bằng hệ thống pháp luật nhà nước sử dụng phương thức "cưỡng bức" mọi cá nhân... thực hiện các chính sách theo hướng có lợi cho giai cấp thống trị... Theo Mác, nhà nước là một cơ quan thống trị giai cấp... là sự kiến lập một trật tự hợp pháp hóa và củng cố sự áp bức.'
  }
];
