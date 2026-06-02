export type DebateQuestion = {
  id: string;
  label: string;
  claim: string;
  expected_points: string[];
  source_chunk: string;
};

export const debateRounds: DebateQuestion[] = [
  {
    id: 'q01',
    label: 'Câu 1 — Sản phẩm',
    claim: 'Nhà nước xuất hiện vì con người cần một tổ chức quản lý xã hội.',
    expected_points: [
      'Xã hội nguyên thủy từng quản lý được cộng đồng mà chưa có nhà nước.',
      'Nguyên nhân sâu xa là sự phát triển của lực lượng sản xuất dẫn tới chế độ tư hữu.',
      'Nguyên nhân trực tiếp là mâu thuẫn giai cấp gay gắt không thể điều hòa.',
      'Nhà nước ra đời để duy trì trật tự có lợi cho giai cấp thống trị.',
    ],
    source_chunk: 'Nguyên nhân sâu xa của sự xuất hiện nhà nước là do sự phát triển của lực lượng sản xuất dẫn đến sự dư thừa tương đối của cải, xuất hiện chế độ tư hữu... nguyên nhân trực tiếp dẫn tới sự xuất hiện nhà nước là do mâu thuẫn giai cấp trong xã hội gay gắt không thể điều hòa được.',
  },
  {
    id: 'q02',
    label: 'Câu 2 — Biểu hiện',
    claim: 'Sự tồn tại của nhà nước chứng minh xã hội đã đạt được sự hòa hợp giữa các giai cấp.',
    expected_points: [
      'Đây là cách hiểu ngược với quan điểm của Lênin.',
      'Nhà nước không chứng minh sự hòa hợp giai cấp.',
      'Sự tồn tại của nhà nước chứng tỏ mâu thuẫn giai cấp vẫn còn tồn tại và không thể điều hòa.',
      'Nếu mâu thuẫn giai cấp đã được giải quyết thì nhà nước với tư cách công cụ thống trị sẽ không còn cơ sở tồn tại.',
    ],
    source_chunk: 'Bất cứ ở đâu, hễ lúc nào và chừng nào mà... những mâu thuẫn giai cấp không thể điều hòa được, thì nhà nước xuất hiện. Và ngược lại: sự tồn tại của nhà nước chứng tỏ rằng những mâu thuẫn giai cấp là không thể điều hòa được.',
  },
  {
    id: 'q03',
    label: 'Câu 3 — Bản chất & Chức năng',
    claim: 'Nhà nước tư bản hiện đại có hệ thống phúc lợi xã hội rất phát triển nên đã trở thành nhà nước của toàn dân, không còn mang bản chất giai cấp.',
    expected_points: [
      'Phúc lợi xã hội thuộc chức năng xã hội của nhà nước.',
      'Chức năng xã hội không quyết định bản chất nhà nước.',
      'Chức năng thống trị chính trị giữ vai trò quyết định.',
      'Không có nhà nước nào đứng ngoài hay đứng trên giai cấp.',
      'Bản chất vẫn là công cụ thống trị của giai cấp cầm quyền.',
    ],
    source_chunk: 'Chức năng thống trị chính trị của nhà nước giữ vai trò quyết định, chi phối và định hướng chức năng xã hội của nhà nước. Về bản chất, nhà nước là một tổ chức chính trị của một giai cấp thống trị về mặt kinh tế nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng của các giai cấp khác. Mâu thuẫn giai cấp chỉ là sự khác biệt về thu nhập giữa người giàu và người nghèo — Xã hội đó đã bị phân thành những mặt đối lập không thể điều hòa mà xã hội đó bất lực không sao loại bỏ được. Xuất hiện giai cấp thống trị và giai cấp bị thống trị... Điều đó dẫn đến những mâu thuẫn giai cấp gay gắt, không thể điều hòa được.',
  },
];
