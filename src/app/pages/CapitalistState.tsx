import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { TopBar } from '../components/TopBar';
import { OutlineLayout } from '../components/PageOutline';

const outline = [
  { id: 'ban-chat-chung', label: 'Bản chất nhà nước' },
  { id: 'hinh-thuc', label: 'Các hình thức tư sản' },
  { id: 'vi-du', label: 'Ví dụ nhà nước tư sản' },
  { id: 'ban-chat', label: 'Bản chất tư sản' },
  { id: 'chuc-nang', label: 'Chức năng tư sản' },
  { id: 'bo-may', label: 'Bộ máy nhà nước tư sản' },
  { id: 'dan-chu', label: 'Dân chủ tư sản' },
  { id: 'so-sanh', label: 'So sánh tư sản – vô sản' },
  { id: 'lien-he', label: 'Liên hệ thực tiễn' },
  { id: 'tai-lieu', label: 'Tài liệu tham khảo' },
];

/* ============================
   4. CÁC HÌNH THỨC NHÀ NƯỚC TƯ SẢN
   (Giáo trình tr.176, dòng 273–286)
   ============================ */
const formGroups = [
  {
    group: 'Chính thể',
    items: [
      { title: 'Cộng hòa đại nghị', text: 'Quyền lực hành pháp gắn với nghị viện; chính phủ do đảng chiếm đa số trong nghị viện lập ra và chịu trách nhiệm trước nghị viện.' },
      { title: 'Cộng hòa tổng thống', text: 'Tổng thống do dân bầu, vừa là nguyên thủ quốc gia vừa đứng đầu cơ quan hành pháp, độc lập tương đối với nghị viện lập pháp.' },
      { title: 'Cộng hòa thủ tướng', text: 'Thủ tướng đứng đầu chính phủ nắm thực quyền hành pháp, chia sẻ quyền lực với tổng thống. Sự phân chia quyền lực giữa tổng thống, thủ tướng và nội các tùy từng quốc gia.' },
      { title: 'Quân chủ lập hiến', text: 'Vẫn duy trì ngôi vua/nữ hoàng nhưng quyền lực thực tế thuộc về nghị viện và chính phủ. Vua chỉ mang tính biểu tượng.' },
    ],
  },
  {
    group: 'Cấu trúc nhà nước',
    items: [
      { title: 'Nhà nước đơn nhất', text: 'Quyền lực nhà nước được tổ chức thống nhất từ trung ương đến địa phương; các đơn vị hành chính không có chủ quyền riêng.' },
      { title: 'Nhà nước liên bang', text: 'Quyền lực được phân chia giữa chính quyền trung ương (liên bang) và các bang thành viên; các bang có quyền tự trị nhất định theo hiến pháp.' },
    ],
  },
];

/* ============================
   5. VÍ DỤ NHÀ NƯỚC TƯ SẢN TIÊU BIỂU
   ============================ */
const examples = [
  { name: 'Hoa Kỳ', form: 'Cộng hòa tổng thống', structure: 'Liên bang', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Hoa_K%E1%BB%B3', desc: 'Nhà nước liên bang theo mô hình cộng hòa tổng thống. Tam quyền phân lập rõ ràng: lập pháp (Quốc hội), hành pháp (Tổng thống), tư pháp (Tòa án Tối cao).' },
  { name: 'Pháp', form: 'Cộng hòa bán tổng thống', structure: 'Đơn nhất', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Ph%C3%A1p', desc: 'Tổng thống và Thủ tướng cùng tham gia điều hành hành pháp; quyền lực được phân chia theo Hiến pháp.' },
  { name: 'Anh', form: 'Quân chủ lập hiến', structure: 'Đơn nhất', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_V%C6%B0%C6%A1ng_qu%E1%BB%91c_Li%C3%AAn_hi%E1%BB%87p_Anh_v%C3%A0_B%E1%BA%AFc_Ireland', desc: 'Duy trì chế độ quân chủ nhưng nghị viện nắm thực quyền. Quyền lực nhà vua mang tính biểu tượng.' },
  { name: 'Nhật Bản', form: 'Quân chủ lập hiến', structure: 'Đơn nhất', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Nh%E1%BA%ADt_B%E1%BA%A3n', desc: 'Thiên hoàng là biểu tượng quốc gia, quyền lực thực tế thuộc Quốc hội và Chính phủ.' },
];

/* ============================
   6. BẢN CHẤT NHÀ NƯỚC TƯ SẢN — 3 cơ sở
   (Giáo trình + Lý luận nhà nước & pháp luật)
   ============================ */
const traits = [
  {
    title: 'Cơ sở kinh tế',
    text: 'Nền kinh tế tư bản chủ nghĩa dựa trên chế độ tư hữu tư bản về tư liệu sản xuất (nhà máy, hầm mỏ, đồn điền…), được thực hiện thông qua hình thức bóc lột giá trị thặng dư.',
  },
  {
    title: 'Cơ sở xã hội',
    text: 'Hai giai cấp cơ bản có lợi ích đối kháng: giai cấp tư sản (thiểu số, nắm hầu hết tư liệu sản xuất) và giai cấp vô sản (đông đảo, bán sức lao động). Ngoài ra còn nông dân, tiểu tư sản, trí thức…',
  },
  {
    title: 'Cơ sở tư tưởng',
    text: 'Luôn tuyên truyền tư tưởng dân chủ – đa nguyên, nhưng trên thực tế tìm mọi cách đảm bảo địa vị độc tôn của ý thức hệ tư sản, ngăn cản sự phát triển và tuyên truyền tư tưởng cách mạng, tiến bộ của giai cấp công nhân.',
  },
];

/* ============================
   6b. CHỨC NĂNG NHÀ NƯỚC TƯ SẢN
   (Lý luận nhà nước & pháp luật)
   ============================ */
const stateFunctions = [
  {
    title: 'Củng cố, bảo vệ sự thống trị',
    text: 'Bảo vệ chế độ tư hữu — coi quyền tư hữu là "thiêng liêng bất khả xâm phạm". Trấn áp giai cấp bị trị về chính trị (đàn áp phong trào đấu tranh) và tư tưởng (đảm bảo địa vị độc tôn của ý thức hệ tư sản).',
    type: 'Đối nội',
  },
  {
    title: 'Chức năng kinh tế',
    text: 'Can thiệp vào kinh tế thông qua chính sách tài chính – tiền tệ, thuế, thị trường. Bảo vệ nền sản xuất trong nước, ngăn ngừa và khắc phục khủng hoảng kinh tế. Đặc biệt phát triển từ giai đoạn CNTB độc quyền.',
    type: 'Đối nội',
  },
  {
    title: 'Chức năng xã hội',
    text: 'Giải quyết việc làm, thất nghiệp, dân số, giáo dục, y tế, bảo vệ môi trường, bảo trợ xã hội cho người già, giải quyết các tệ nạn xã hội. Tùy thuộc tương quan lực lượng chính trị trong từng giai đoạn.',
    type: 'Đối nội',
  },
  {
    title: 'Chiến tranh, chống phá cách mạng',
    text: 'Mở rộng thuộc địa, chia lại thế giới (thời kỳ CNTB tự do cạnh tranh). Chống phá các nước XHCN, đe dọa phong trào giải phóng dân tộc (khi hệ thống XHCN được thiết lập).',
    type: 'Đối ngoại',
  },
  {
    title: 'Hòa bình, hợp tác quốc tế',
    text: 'Trong giai đoạn hiện nay, nhiều nhà nước tư sản có chính sách đối ngoại mềm dẻo, tăng cường hợp tác quốc tế về kinh tế, văn hóa – xã hội, môi trường, khoa học – kỹ thuật, nhân đạo.',
    type: 'Đối ngoại',
  },
];

/* ============================
   6c. BỘ MÁY NHÀ NƯỚC TƯ SẢN
   (Thuyết phân quyền — tam quyền phân lập)
   ============================ */
const stateApparatus = [
  {
    title: 'Nghị viện',
    role: 'Lập pháp',
    text: 'Cơ quan quyền lực cao nhất, nắm quyền lập pháp. Thường có cơ cấu 2 viện: Thượng viện và Hạ viện. Hạ viện hình thành qua bầu cử; Thượng viện có thể bầu, bổ nhiệm hoặc thừa kế.',
  },
  {
    title: 'Nguyên thủ quốc gia',
    role: 'Đứng đầu nhà nước',
    text: 'Đại diện quốc gia trong quan hệ đối nội và đối ngoại. Trong cộng hòa tổng thống: quyền lực rất lớn, vừa đứng đầu nhà nước vừa đứng đầu hành pháp. Trong quân chủ lập hiến / cộng hòa đại nghị: chủ yếu mang tính biểu tượng.',
  },
  {
    title: 'Chính phủ',
    role: 'Hành pháp',
    text: 'Giữ vị trí trung tâm trong bộ máy nhà nước. Quyết định phần lớn chính sách đối nội và đối ngoại. Cách thành lập tùy hình thức chính thể: do tổng thống bổ nhiệm (Mỹ) hoặc do đảng đa số trong nghị viện lập ra (Đức, Nhật).',
  },
  {
    title: 'Tòa án',
    role: 'Tư pháp',
    text: 'Nắm quyền tư pháp. Thẩm phán có tính chuyên nghiệp cao, nhiệm kỳ dài (một số nước: suốt đời). Ngoài tòa án thường còn có tòa hành chính, tòa bảo hiến, tòa thương mại…',
  },
];

/* ============================
   7. DÂN CHỦ TƯ SẢN — phân tích sâu
   (Giáo trình tr.176, dòng 287–293)
   ============================ */
const bourgeoisDemocracy = [
  {
    title: 'Nhà nước tư sản là công cụ chuyên chính',
    text: 'Theo Mác, nhà nước là một cơ quan thống trị giai cấp, là một cơ quan áp bức của một giai cấp này đối với một giai cấp khác; đó là sự kiến lập một "trật tự", trật tự này hợp pháp hóa và củng cố sự áp bức kia bằng cách làm dịu xung đột giai cấp.',
    tag: 'V.I. Lênin, Nhà nước và Cách mạng',
  },
  {
    title: 'Dân chủ chỉ là hình thức',
    text: 'Các hình thức nhà nước tư sản đều đề cao quyền tự do, dân chủ của mọi người. Tuy nhiên, về bản chất, nhà nước tư sản nào cũng là công cụ chuyên chính của giai cấp tư sản, được luật pháp tư sản bảo vệ, thực chất chỉ là nền dân chủ của số ít, là nền dân chủ có giới hạn.',
    tag: 'Giáo trình tr.291–293',
  },
  {
    title: 'Bản chất không thay đổi dù hình thức đa dạng',
    text: 'Ph. Ăngghen: nhà nước "chẳng qua chỉ là một bộ máy của một giai cấp này dùng để trấn áp một giai cấp khác, điều đó, trong chế độ cộng hòa dân chủ cũng hoàn toàn giống như trong chế độ quân chủ".',
    tag: 'Ph. Ăngghen',
  },
];

/* ============================
   9. SO SÁNH
   ============================ */
const compareRows = [
  ['Cơ sở kinh tế', 'Dựa trên chế độ tư hữu tư bản chủ nghĩa', 'Dựa trên chế độ công hữu về tư liệu sản xuất chủ yếu'],
  ['Giai cấp nắm quyền', 'Giai cấp tư sản (thiểu số trong xã hội)', 'Nhân dân lao động do giai cấp công nhân lãnh đạo (đại đa số)'],
  ['Bản chất dân chủ', 'Dân chủ tư sản (hình thức, bị tư bản chi phối)', 'Dân chủ vô sản (thực chất, phục vụ số đông Nhân dân)'],
  ['Mục tiêu', 'Bảo vệ quyền sở hữu tư nhân, tối đa hóa lợi nhuận', 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh'],
];

/* ================================================================
   COMPONENT
   ================================================================ */
export default function CapitalistState() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white px-4 py-3 text-lg font-serif text-slate-700">
            <span className="font-sans text-xl text-red-600">•</span>
            <span>Nhà nước tư sản (tư bản chủ nghĩa)</span>
          </div>
          <div className="flex items-center gap-6 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            <span className="text-red-600">•</span>
            <span>Chương III · Giáo trình Triết học Mác - Lênin 2021</span>
          </div>
        </div>
      </div>

      <OutlineLayout items={outline}>
        <article>
          {/* ========== HERO ========== */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b-4 border-red-600 bg-white pb-7"
          >
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Một kiểu nhà nước trong lịch sử</div>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Nhà nước tư sản
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Nhà nước tư sản là kiểu nhà nước ra đời cùng phương thức sản xuất tư bản chủ nghĩa. Mặc dù tồn tại dưới nhiều hình thức như cộng hòa tổng thống, cộng hòa đại nghị hay quân chủ lập hiến, theo V.I. Lênin, về bản chất chúng đều là công cụ thống trị của giai cấp tư sản.
            </p>

            <figure className="mt-6 border-l-4 border-red-600 bg-slate-50 px-5 py-4">
              <blockquote className="font-serif text-2xl font-black leading-9 text-red-700 md:text-3xl">
                &ldquo;Những hình thức của các nhà nước tư sản thì hết sức khác nhau, nhưng thực chất chỉ là một: chung quy lại, tất cả những hình thức nhà nước ấy, vô luận thế nào, cũng tất nhiên phải là nền chuyên chính tư sản.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm font-bold text-slate-600">— V.I. Lênin, Nhà nước và Cách mạng</figcaption>
            </figure>
          </motion.section>

          {/* ========== 4. CÁC HÌNH THỨC TƯ SẢN ========== */}
          <motion.section
            id="hinh-thuc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Các hình thức nhà nước tư sản</h2>
            <div className="space-y-6">
              {formGroups.map((g) => (
                <div key={g.group}>
                  <div className="mb-3 inline-block bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                    {g.group}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {g.items.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.05 }}
                        className="border-l-4 border-red-600 bg-slate-50 p-5"
                      >
                        <h3 className="text-xl font-black text-slate-950">{f.title}</h3>
                        <p className="mt-2 text-base leading-7 text-slate-700">{f.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-4xl text-base leading-7 text-slate-700">
              Dù khác nhau về cách tổ chức quyền lực và cấu trúc nhà nước, theo V.I. Lênin, về bản chất tất cả đều là <span className="font-bold text-slate-950">nền chuyên chính tư sản</span>.
            </p>
          </motion.section>

          {/* ========== 5. VÍ DỤ NHÀ NƯỚC TƯ SẢN ========== */}
          <motion.section
            id="vi-du"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Ví dụ nhà nước tư sản tiêu biểu</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {examples.map((e, i) => (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-2 text-2xl font-black text-slate-950">
                    <a href={e.href} target="_blank" rel="noopener noreferrer"
                      className="hover:text-red-600 hover:underline">{e.name}</a>
                  </div>
                  <div className="mb-1 flex flex-wrap gap-1.5">
                    <span className="inline-flex rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{e.form}</span>
                    <span className="inline-flex rounded border border-slate-300 bg-white px-2 py-0.5 text-xs font-bold text-slate-600">{e.structure}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ========== 6. BẢN CHẤT NHÀ NƯỚC TƯ SẢN — 3 cơ sở ========== */}
          <motion.section
            id="ban-chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Bản chất nhà nước tư sản</h2>
            <p className="mb-6 max-w-4xl text-base leading-7 text-slate-700">
              Bản chất của nhà nước tư sản do những điều kiện nội tại của xã hội tư sản quyết định, thể hiện qua <span className="font-bold text-slate-950">ba cơ sở: kinh tế, xã hội và tư tưởng</span>. Nhà nước tư sản cũng mang hai bản chất: tính giai cấp (công cụ thống trị của giai cấp tư sản) và tính xã hội (thực hiện chức năng công ích, duy trì trật tự xã hội).
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {traits.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-2 inline-flex rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{t.title}</div>
                  <p className="mt-2 text-base leading-7 text-slate-700">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ========== 7. CHỨC NĂNG NHÀ NƯỚC TƯ SẢN ========== */}
          <motion.section
            id="chuc-nang"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Chức năng nhà nước tư sản</h2>
            <p className="mb-6 text-base leading-7 text-slate-700">
              Bản chất nhà nước tư sản thể hiện thông qua các chức năng <span className="font-bold text-slate-950">đối nội</span> và <span className="font-bold text-slate-950">đối ngoại</span>:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stateFunctions.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.04 }}
                  className="border-l-4 border-red-600 bg-slate-50 p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-bold text-white ${f.type === 'Đối nội' ? 'bg-slate-700' : 'bg-red-600'}`}>
                      {f.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ========== 8. BỘ MÁY NHÀ NƯỚC TƯ SẢN ========== */}
          <motion.section
            id="bo-may"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Bộ máy nhà nước tư sản</h2>
            <p className="mb-6 text-base leading-7 text-slate-700">
              Tổ chức bộ máy nhà nước tư sản dựa trên <span className="font-bold text-slate-950">thuyết phân quyền (tam quyền phân lập)</span>: quyền lực nhà nước chia thành 3 nhánh — lập pháp, hành pháp, tư pháp — giao cho 3 cơ quan khác nhau, kìm chế và đối trọng lẫn nhau.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {stateApparatus.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.05 }}
                  className="border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-2 inline-flex rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{a.role}</div>
                  <h3 className="text-xl font-black text-slate-950">{a.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{a.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ========== 9. DÂN CHỦ TƯ SẢN ========== */}
          <motion.section
            id="dan-chu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Dân chủ tư sản theo giáo trình</h2>

            <figure className="mb-6 border-l-4 border-red-600 bg-slate-50 px-5 py-4">
              <blockquote className="font-serif text-xl font-black leading-8 text-red-700 md:text-2xl">
                &ldquo;Nhà nước chẳng qua chỉ là một bộ máy của một giai cấp này dùng để trấn áp một giai cấp khác, điều đó, trong chế độ cộng hòa dân chủ cũng hoàn toàn giống như trong chế độ quân chủ.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm font-bold text-slate-600">— Ph. Ăngghen</figcaption>
            </figure>

            <div className="grid gap-6 md:grid-cols-3">
              {bourgeoisDemocracy.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 inline-flex w-fit rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {p.tag}
                  </div>
                  <h3 className="text-lg font-black leading-tight text-slate-950">{p.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ========== 9. SO SÁNH ========== */}
          <motion.section
            id="so-sanh"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">So sánh nhà nước tư sản và nhà nước vô sản</h2>
            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-base">
                  <thead className="bg-red-600 text-sm uppercase tracking-wide text-white">
                    <tr>
                      <th className="px-5 py-4">Tiêu chí</th>
                      <th className="px-5 py-4">Nhà nước tư sản</th>
                      <th className="px-5 py-4">Nhà nước vô sản</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map(([crit, bourgeois, proletarian]) => (
                      <tr key={crit} className="border-t border-slate-200">
                        <td className="px-5 py-4 font-black text-slate-950">{crit}</td>
                        <td className="px-5 py-4 text-slate-700">{bourgeois}</td>
                        <td className="px-5 py-4 text-slate-700">{proletarian}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* ========== 10. LIÊN HỆ THỰC TIỄN ========== */}
          <motion.section
            id="lien-he"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-b border-slate-200 py-7"
          >
            <div className="mx-auto max-w-4xl rounded-lg border-l-4 border-red-600 bg-red-50 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Liên hệ thực tiễn</h2>
              <p className="text-base leading-7 text-slate-800">
                Trong điều kiện chủ nghĩa tư bản hiện đại, nhà nước tư sản tiếp tục thực hiện các chức năng quản lý kinh tế, xã hội và đối ngoại. Tuy nhiên, theo quan điểm của chủ nghĩa Mác – Lênin, bản chất giai cấp của nhà nước tư sản không thay đổi, bởi nhà nước vẫn bảo vệ nền tảng kinh tế dựa trên chế độ tư hữu tư bản chủ nghĩa.
              </p>
            </div>
          </motion.section>

          {/* ========== TÀI LIỆU THAM KHẢO ========== */}
          <motion.section
            id="tai-lieu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="border-b-4 border-red-600 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Tài liệu tham khảo</h2>
            <ol className="mt-4 space-y-3">
              {[
                { label: 'Lý luận nhà nước — Chương III (trang nội bộ)', href: '/theory' },
                { label: 'Nhà nước tư sản là gì, ví dụ về nhà nước tư sản? — Thư viện Pháp luật', href: 'https://thuvienphapluat.vn/lao-dong-tien-luong/cam-nang-di-lam/nha-nuoc-tu-san-la-gi-vi-du-ve-nha-nuoc-tu-san-ban-chat-cua-nha-nuoc-tu-san-la-gi-anh-huong-den-nguo-666.html' },
                { label: 'Bản chất, chức năng, bộ máy và hình thức nhà nước tư sản — HocLuat.vn', href: 'https://hocluat.vn/ban-chat-chuc-nang-bo-may-va-hinh-thuc-nha-nuoc-tu-san/' },
                { label: 'Chính trị Hoa Kỳ — Wikipedia', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Hoa_K%E1%BB%B3' },
                { label: 'Chính trị Pháp — Wikipedia', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Ph%C3%A1p' },
                { label: 'Chính trị Vương quốc Liên hiệp Anh và Bắc Ireland — Wikipedia', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_V%C6%B0%C6%A1ng_qu%E1%BB%91c_Li%C3%AAn_hi%E1%BB%87p_Anh_v%C3%A0_B%E1%BA%AFc_Ireland' },
                { label: 'Chính trị Nhật Bản — Wikipedia', href: 'https://vi.wikipedia.org/wiki/Ch%C3%ADnh_tr%E1%BB%8B_Nh%E1%BA%ADt_B%E1%BA%A3n' },
              ].map((r, i) => (
                <li key={r.href} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="shrink-0 font-black text-red-600">{i + 1}.</span>
                  {r.href.startsWith('/') ? (
                    <Link to={r.href} className="text-red-600 hover:underline">{r.label}</Link>
                  ) : (
                    <a href={r.href} target="_blank" rel="noopener noreferrer"
                      className="text-red-600 hover:underline">{r.label}</a>
                  )}
                </li>
              ))}
            </ol>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
