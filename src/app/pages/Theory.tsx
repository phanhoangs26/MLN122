import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { ContradictionResolver } from '../components/games/ContradictionResolver';
import { StateSimulation } from '../components/StateSimulation';
import { ClassContradictionIntro } from '../components/ClassContradictionIntro';

import clsx from 'clsx';

const stages = [
  { min: 0, no: 'GIAI ĐOẠN 01', name: 'Xã hội nguyên thủy', desc: 'Thị tộc, bộ lạc tự quản. Chưa tư hữu, chưa giai cấp, chưa cần bộ máy quyền lực tách khỏi nhân dân.' },
  { min: 25, no: 'GIAI ĐOẠN 02', name: 'Sản phẩm dư thừa', desc: 'Năng suất tăng, xuất hiện của cải dư thừa tương đối — tiền đề kinh tế cho chế độ tư hữu.' },
  { min: 50, no: 'GIAI ĐOẠN 03', name: 'Chế độ tư hữu xuất hiện', desc: 'Một bộ phận người chiếm hữu của cải và tư liệu sản xuất nhiều hơn người khác. Từ sự khác biệt về sở hữu bắt đầu hình thành các nhóm người có địa vị kinh tế khác nhau.' },
  { min: 75, no: 'GIAI ĐOẠN 04', name: 'Mâu thuẫn không thể điều hòa', desc: 'Một bên muốn duy trì đặc quyền sở hữu. Một bên muốn xóa bỏ áp bức và bóc lột. Hai lợi ích đối lập không thể dung hòa bằng cơ chế tự quản cộng đồng.' },
  { min: 100, no: 'GIAI ĐOẠN 05', name: 'Nhà nước ra đời', desc: 'Để các giai cấp đối kháng không tiêu diệt lẫn nhau và làm tan rã xã hội, một quyền lực công cộng đặc biệt xuất hiện. Quyền lực đó đứng trên xã hội nhưng dần tách khỏi xã hội — đó chính là nhà nước.' }
];

const prodLabels = [
  'Cộng đồng săn bắt, hái lượm',
  'Bắt đầu canh tác, chăn nuôi',
  'Tích lũy của cải',
  'Phân tầng rõ rệt',
  'Xã hội có giai cấp đối kháng'
];

export default function Theory() {
  // SIMULATION STATE
  const [prod, setProd] = useState(0);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const surplus = clamp((prod - 15) * 1.3);
  const property = clamp((prod - 35) * 1.5);
  const cls = clamp((prod - 50) * 1.8);
  const conflict = clamp((prod - 60) * 2.1);

  let currentStage = stages[0];
  for (const st of stages) {
    if (prod >= st.min) currentStage = st;
  }
  const li = Math.min(4, Math.floor(prod / 25));


  // FLIP CARD STATE
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlipModal, setShowFlipModal] = useState(false);

  // FEATURES CARD STATE
  const [openFeats, setOpenFeats] = useState<Set<number>>(new Set());
  const toggleFeat = (id: number) => {
    setOpenFeats(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="theory-page">
      <TopBar />
      
      {/* HERO */}
      <header className="hero relative">
        <svg className="star" viewBox="0 0 100 100"><polygon fill="var(--red)" points="50,2 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38"/></svg>
        <div className="wrap relative z-10">
          <div className="hero-tag">CHUYÊN ĐỀ · TRIẾT HỌC MÁC – LÊNIN</div>
          <h1>NHÀ NƯỚC VÀ<br /><em>MÀU THUẪN GIAI CẤP</em></h1>
          <div className="quote-block">
            <p>"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được."</p>
            <cite>— V.I. LÊNIN, <i>Nhà nước và Cách mạng</i></cite>
          </div>
          <div className="scroll-cue">↓ KÉO THANH BÊN DƯỚI ĐỂ TỰ TAY DỰNG NÊN NHÀ NƯỚC</div>
        </div>
      </header>

      {/* TẦNG 0: CLASS CONTRADICTION INTRO */}
      <ClassContradictionIntro />

      {/* SIM: TẦNG 1 */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 1 — Nhà nước là SẢN PHẨM</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Bạn không thể dựng nhà nước<br />nếu chưa có mâu thuẫn giai cấp</h2>
          <p className="lead muted">Kéo thanh <b>Lực lượng sản xuất</b>. Hãy quan sát: nhà nước <em>không</em> xuất hiện vì bạn ra lệnh — nó chỉ xuất hiện như một <em>tất yếu</em> khi chuỗi nhân quả hoàn tất.</p>

          <div className="sim-grid">
            <div className="dial">
              <label htmlFor="prod">⚙️ LỰC LƯỢNG SẢN XUẤT</label>
              <input 
                type="range" 
                id="prod" 
                min="0" max="100" 
                value={prod} 
                onChange={(e) => setProd(Number(e.target.value))} 
              />
              <div className="readout">Trình độ: {prod}% — {prodLabels[li]}</div>
              <div className="bars">
                <div className="bar-row">
                  <div className="bl"><span>Sản phẩm dư thừa</span><span>{Math.round(surplus)}%</span></div>
                  <div className="bar-track"><div className="bar-fill surplus" style={{ width: `${surplus}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Chế độ tư hữu</span><span>{Math.round(property)}%</span></div>
                  <div className="bar-track"><div className="bar-fill prop" style={{ width: `${property}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Phân hóa giai cấp</span><span>{Math.round(cls)}%</span></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${cls}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Mâu thuẫn lợi ích đối kháng</span><span>{Math.round(conflict)}%</span></div>
                  <div className="bar-track"><div className="bar-fill conflict" style={{ width: `${conflict}%` }}></div></div>
                </div>
              </div>
            </div>

            <div>
              <div className="stage">
                <div className="st-no">{currentStage.no}</div>
                <div className="st-name">{currentStage.name}</div>
                <div className="st-desc">{currentStage.desc}</div>
              </div>
              <div className={clsx("verdict", prod >= 100 && "show")}>
                ⚑ NHÀ NƯỚC RA ĐỜI — như một tất yếu lịch sử, không phải do thần thánh hay ý chí cá nhân sắp đặt.
              </div>
              {prod >= 100 && (
                <div style={{ marginTop: '24px', padding: '20px 24px', background: '#171210', border: '3px solid var(--red)', color: '#f3ead7' }}>
                  <div style={{ fontFamily: 'Oswald', letterSpacing: '.18em', textTransform: 'uppercase', fontSize: '12px', color: 'var(--gold)', marginBottom: '10px' }}>Kết luận Tầng 1</div>
                  <p style={{ marginBottom: '10px', lineHeight: 1.6 }}>Nhà nước không xuất hiện vì ý chí của cá nhân, cũng không phải do một "khế ước xã hội".</p>
                  <p style={{ marginBottom: '10px', lineHeight: 1.6 }}>Theo chủ nghĩa Mác – Lênin, nhà nước là kết quả tất yếu của quá trình: <strong style={{ color: '#d8a13a' }}>phát triển lực lượng sản xuất → tư hữu → phân hóa giai cấp → mâu thuẫn giai cấp không thể điều hòa.</strong></p>
                  <p style={{ lineHeight: 1.6, fontStyle: 'italic', color: '#ece0c8' }}>Vì vậy, nhà nước là <strong style={{ color: 'white' }}>sản phẩm lịch sử</strong> của xã hội có giai cấp.</p>
                </div>
              )}
              <p className="src-note">Mạch nhân quả: dư thừa → tư hữu → phân hóa giai cấp → mâu thuẫn không thể điều hòa → nhà nước. (Giáo trình Triết học Mác–Lênin 2021, Ch.III)</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TẦNG 2: STATE SIMULATION */}
      <StateSimulation />

      {/* TẦNG 3: CONTRADICTION RESOLVER */}
      <ContradictionResolver />

      {/* TẦNG 4: FLIP */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 4 — Hai mặt bản chất</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Tính xã hội nhìn thấy,<br />tính giai cấp quyết định</h2>
          <div className="flip-wrap" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={clsx("flip", isFlipped && "flipped")}>
              <div className="face front">
                <div className="ft">MẶT NHÌN THẤY · TÍNH XÃ HỘI</div>
                <h3>Duy trì đời sống xã hội</h3>
                <p>Nhà nước thực hiện các chức năng xã hội cần thiết: giáo dục, y tế, hạ tầng, an ninh, môi trường. Ăngghen: chức năng xã hội là <em>cơ sở</em> của sự thống trị chính trị.</p>
                <div className="flip-hint">↻ BẤM ĐỂ LẬT — AI THỰC SỰ ĐƯỢC BẢO VỆ?</div>
              </div>
              <div className="face back" onClick={e => e.stopPropagation()}>
                <div className="ft">BẢN CHẤT QUYẾT ĐỊNH · TÍNH GIAI CẤP</div>
                <h3>Ai thực sự được bảo vệ?</h3>
                <p>Không có nhà nước đứng trên hay ngoài giai cấp.</p>
                <p><strong>Nhà nước là công cụ chính trị của giai cấp thống trị.</strong></p>
                <button
                  onClick={() => setShowFlipModal(true)}
                  style={{ marginTop: '16px', fontFamily: 'Oswald', letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '13px', color: 'var(--gold)', background: 'none', border: '1px solid var(--gold)', padding: '8px 18px', cursor: 'pointer', width: 'fit-content' }}
                >
                  Vì sao? →
                </button>
                <div className="flip-hint" onClick={() => setIsFlipped(false)}>↻ LẬT LẠI</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FLIP MODAL */}
      {showFlipModal && (
        <div
          onClick={() => setShowFlipModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--ink)', color: 'var(--cream)', border: '4px solid var(--gold)', maxWidth: '580px', width: '100%', padding: '40px', position: 'relative' }}
          >
            <button
              onClick={() => setShowFlipModal(false)}
              style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'var(--gold)', fontFamily: 'Oswald', fontSize: '20px', cursor: 'pointer', letterSpacing: '.1em' }}
            >
              ✕
            </button>
            <div style={{ fontFamily: 'Oswald', fontSize: '12px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', opacity: .7 }}>
              Giải thích
            </div>
            <h3 style={{ fontFamily: 'Oswald', fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px', lineHeight: 1.2 }}>
              Tại sao tính giai cấp giữ vai trò quyết định?
            </h3>
            <div style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--cream)' }}>
              <p style={{ marginBottom: '14px' }}>
                Theo Ăngghen, chức năng xã hội là <em>cơ sở</em> để nhà nước thực hiện sự thống trị chính trị.
              </p>
              <p style={{ marginBottom: '14px' }}>
                Vì vậy nhà nước vừa thực hiện các nhu cầu chung của xã hội, vừa bảo vệ trật tự phù hợp với lợi ích của giai cấp thống trị.
              </p>
              <p style={{ marginBottom: '0', fontWeight: 700, color: '#ffd98a' }}>
                Tính xã hội tồn tại, nhưng tính giai cấp giữ vai trò quyết định.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ĐẶC TRƯNG */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 5 — Ba đặc trưng nhà nước</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>3 đặc trưng phân biệt nhà nước<br />với mọi tổ chức xã hội khác</h2>
          <p className="lead muted">Bấm vào từng thẻ để mở rộng.</p>
          <div className="feat-grid">
            {[
              { id: 1, title: 'Quản lý cư dân theo lãnh thổ', more: 'Khác thị tộc dựa trên huyết thống, nhà nước phân chia & quản lý dân cư theo đơn vị lãnh thổ; quyền lực có hiệu lực với mọi thành viên trong biên giới.', src: '— Lênin, Nhà nước và Cách mạng' },
              { id: 2, title: 'Bộ máy cưỡng chế chuyên nghiệp', more: '"Những đội vũ trang đặc biệt" — quân đội, cảnh sát, tòa án, nhà tù & bộ máy hành chính — buộc mọi thành viên phục tùng ý chí giai cấp cầm quyền.', src: '— Lênin' },
              { id: 3, title: 'Thuế khóa', more: 'Để nuôi quyền lực công cộng đặt trên xã hội, nhà nước phải có thuế và quốc trái. "Cần phải có sự đóng góp của công dân, đó là thuế má."', src: '— Ph. Ăngghen' }
            ].map((f) => (
              <div key={f.id} className={clsx("feat", openFeats.has(f.id) && "open")} onClick={() => toggleFeat(f.id)}>
                <div className="fn">0{f.id}</div>
                <h3>{f.title}</h3>
                <div className="more">{f.more}</div>
                <span className="src">{f.src}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* THỰC TIỄN */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 6 — Liên hệ thực tiễn</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Luận điểm 1917 đọc tin tức hôm nay</h2>
          <p className="lead muted">Mâu thuẫn giai cấp ngày nay ít khi là đối đầu trực diện kiểu thế kỷ XIX — nhưng nhà nước vẫn không ngừng phải <em>điều tiết</em> xung đột lợi ích. Đó chính là tính thời sự của luận điểm.</p>
          <div className="real-grid">
            <div className="case">
              <div className="tag">LAO ĐỘNG ↔ NỀN TẢNG</div>
              <h3>Tài xế công nghệ & "gig economy"</h3>
              <p><b>Mâu thuẫn lợi ích:</b> Tài xế muốn thu nhập ổn định, bảo hiểm và địa vị lao động — nền tảng (Grab, Uber, Be...) muốn tối ưu chi phí, giữ mô hình "đối tác độc lập".</p>
              <p><b>Nhà nước can thiệp:</b> Ban hành luật lao động mới, quy định thuế thu nhập, bắt buộc đóng bảo hiểm xã hội cho tài xế công nghệ.</p>
              <p className="case-link">→ Nhà nước xuất hiện đúng lúc mâu thuẫn lợi ích không thể tự giải quyết — đúng luận điểm Lenin.</p>
            </div>
            <div className="case">
              <div className="tag">VỐN ↔ XÃ HỘI</div>
              <h3>Thuế tối thiểu toàn cầu</h3>
              <p><b>Mâu thuẫn lợi ích:</b> Tập đoàn đa quốc gia muốn tối đa hóa lợi nhuận bằng cách chuyển dịch vốn sang thiên đường thuế — chính phủ các nước mất nguồn thu, công nhân mất việc làm.</p>
              <p><b>Nhà nước can thiệp:</b> G20 áp thuế tối thiểu doanh nghiệp 15% (Pillar Two 2024) để ngăn tránh thuế; Việt Nam ban hành thuế tối thiểu toàn cầu từ 1/1/2024.</p>
              <p className="case-link">→ Xung đột lợi ích tư bản–lao động vẫn cần nhà nước điều tiết ở quy mô toàn cầu.</p>
            </div>
            <div className="case">
              <div className="tag">TƯ BẢN ↔ LAO ĐỘNG SỐ</div>
              <h3>AI & dịch chuyển việc làm</h3>
              <p><b>Mâu thuẫn lợi ích:</b> Doanh nghiệp sở hữu AI và dữ liệu — tư liệu sản xuất thế kỷ XXI — để tối ưu lợi nhuận; người lao động đứng trước nguy cơ mất việc hàng loạt.</p>
              <p><b>Nhà nước can thiệp:</b> EU ban hành AI Act (2024), các quốc gia đàm phán khung pháp lý về dữ liệu và việc làm để giữ xung đột "trong vòng trật tự".</p>
              <p className="case-link">→ Quan hệ sở hữu thay đổi hình thức: từ nhà máy sang dữ liệu và thuật toán. Nhưng xung đột lợi ích giữa bên sở hữu và người lao động vẫn tồn tại.</p>
            </div>
            <div className="case">
              <div className="tag">NỀN TẢNG ↔ NGƯỜI SÁNG TẠO</div>
              <h3>Nền tảng số & người sáng tạo nội dung</h3>
              <p><b>Mâu thuẫn lợi ích:</b> YouTube, TikTok, Meta sở hữu hạ tầng phân phối và thuật toán — người sáng tạo tạo ra giá trị nhưng không kiểm soát được phân phối lợi nhuận, có thể bị xóa kênh hoặc giảm thu nhập bất kỳ lúc nào.</p>
              <p><b>Nhà nước can thiệp:</b> Nhiều quốc gia ban hành luật bảo vệ người sáng tạo, quy định chia sẻ doanh thu, chống độc quyền nền tảng — điều tiết quan hệ giữa bên sở hữu tư liệu phân phối và người lao động sáng tạo.</p>
              <p className="case-link">→ Quan hệ bóc lột giá trị thặng dư vẫn tồn tại — chỉ đổi hình thức từ nhà máy sang nền tảng số.</p>
            </div>
          </div>

          <div className="vn">
            <div className="vn-head">
              <span className="vn-flag">★</span>
              <div>
                <div className="vn-kick">LIÊN HỆ VIỆT NAM · 2025–2026</div>
                <h3>Nhà nước pháp quyền XHCN — lý thuyết Chương III soi vào thực tiễn</h3>
              </div>
            </div>
            <p className="vn-intro">Nhà nước pháp quyền XHCN Việt Nam là <em>hình thức nhà nước của thời kỳ quá độ</em> lên CNXH dưới sự lãnh đạo của Đảng. Vận dụng sáng tạo học thuyết Mác–Lênin: <b>"của Nhân dân, do Nhân dân, vì Nhân dân"</b> — nền tảng là liên minh công–nông–trí, ưu tiên chức năng tổ chức, xây dựng hơn chức năng trấn áp.</p>

            <div className="vn-grid">
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #1 · QUẢN LÝ LÃNH THỔ</div><div className="vnum">34</div><div className="vlab">tỉnh, thành phố</div><p>Từ 1/7/2025 vận hành chính quyền địa phương <b>hai cấp (tỉnh–xã)</b>: 34 tỉnh/thành và 3.321 xã, phường, đặc khu (NQ 202/2025/QH15, hiệu lực 12/6/2025) — quản lý thống nhất toàn lãnh thổ.</p><p className="vn-link-small">→ Minh họa đặc trưng quản lý dân cư theo lãnh thổ, không theo huyết thống hay nghề nghiệp.</p></div>
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #2 · CƯỠNG CHẾ CHUYÊN NGHIỆP</div><div className="vnum">3</div><div className="vlab">cấp công an</div><p>Năm 2025 công an chuyển sang mô hình <b>ba cấp (Bộ–tỉnh–xã)</b>, chấm dứt công an cấp huyện — củng cố hệ thống cơ quan quyền lực công cộng đặc biệt ngay tại cơ sở.</p><p className="vn-link-small">→ Minh họa bộ máy cưỡng chế chuyên nghiệp — "những đội vũ trang đặc biệt" theo Lênin.</p></div>
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #3 · THUẾ KHÓA</div><div className="vnum">Tối ưu</div><div className="vlab">ngân sách quốc gia</div><p>Thuế là nguồn tài chính chủ yếu nuôi bộ máy; cải cách hành chính, tinh giản biên chế ("Tinh–Gọn–Mạnh") nhằm giảm gánh nặng ngân sách, sử dụng hiệu quả tiền thuế của Nhân dân.</p><p className="vn-link-small">→ Minh họa đặc trưng thuế khóa — nguồn lực duy trì quyền lực công cộng đặt trên xã hội.</p></div>
              <div className="vn-card"><div className="vt">CHỨC NĂNG XÃ HỘI · ĐỐI NỘI</div><div className="vnum">&gt;99%</div><div className="vlab">hồ sơ đúng hạn (2025)</div><p>Cải cách hành chính gắn chuyển đổi số (Đề án 06, Cổng Dịch vụ công quốc gia): nhiều địa phương giải quyết hồ sơ đúng hạn trên 99%, mở rộng dịch vụ công trực tuyến.</p><p className="vn-link-small">→ Thể hiện tính xã hội của nhà nước — cơ sở thực hiện chức năng giai cấp bền vững hơn.</p></div>
            </div>

            <p className="vn-link"><b>Liên hệ trực tiếp luận điểm Lênin:</b> sự tồn tại và liên tục hoàn thiện của Nhà nước (kiểm soát quyền lực, chống tham nhũng, phát huy dân chủ XHCN theo NQ 27-NQ/TW & Đại hội XIV) cho thấy nhà nước <em>không đứng ngoài xã hội</em> mà là thiết chế điều tiết các quan hệ, mâu thuẫn xã hội — đúng với mạch lý luận Chương III.</p>
          </div>

          <p className="src-note">Nguồn: NQ 202/2025/QH15; NQ 27-NQ/TW; Văn kiện Đại hội XIV; Cổng TTĐT Chính phủ; Báo Nhân Dân, VOV (2025). Mỗi ca trên xác nhận: vai trò điều tiết của nhà nước gắn trực tiếp với xử lý mâu thuẫn xã hội → luận điểm Lênin vẫn nguyên tính thời sự.</p>
        </div>
      </motion.section>

      {/* TIÊU VONG */}
      <motion.section className="end" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker" style={{ color: 'var(--gold)' }}>Tầng 7 — Hệ quả logic</div>
          <h2>NẾU MÂU THUẪN MẤT ĐI<br /><em>NHÀ NƯỚC TỰ TIÊU VONG</em></h2>

          {/* Syllogism chain */}
          <div style={{ margin: '40px 0', maxWidth: '560px' }}>
            {[
              { n: '1', text: 'Nhà nước là sản phẩm của mâu thuẫn giai cấp.' },
              { n: '2', text: 'Nhà nước tồn tại vì mâu thuẫn giai cấp còn tồn tại.' },
              { n: '3', text: 'Nếu mâu thuẫn giai cấp bị xóa bỏ hoàn toàn…' },
              { n: '4', text: '…nhà nước mất cơ sở tồn tại.' },
              { n: '∴', text: 'Nhà nước dần tiêu vong — như một tất yếu logic.', gold: true },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: i < 4 ? '0' : '0' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '36px', height: '36px', border: `2px solid ${step.gold ? 'var(--gold)' : 'var(--red)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald', fontWeight: 700, fontSize: '14px', color: step.gold ? 'var(--gold)' : 'var(--red)', background: 'transparent' }}>
                    {step.n}
                  </div>
                  {i < 4 && <div style={{ width: '2px', height: '24px', background: 'rgba(255,255,255,0.15)', margin: '4px 0' }} />}
                </div>
                <p style={{ paddingTop: '6px', fontSize: '17px', color: step.gold ? 'var(--gold)' : 'var(--cream)', fontWeight: step.gold ? 700 : 400, lineHeight: 1.5, marginBottom: i < 4 ? '0' : '0' }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bridge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0 40px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Oswald', fontSize: '13px', letterSpacing: '.2em', textTransform: 'uppercase' }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            ↓ Quá trình diễn ra như thế nào?
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </motion.div>

          {/* Timeline */}
          <div style={{ margin: '0 0 36px' }}>
            <div style={{ fontFamily: 'Oswald', letterSpacing: '.15em', fontSize: '13px', color: 'var(--gold)', marginBottom: '28px', textTransform: 'uppercase', fontWeight: 700 }}>
              Làm thế nào để đi tới "nhà nước tự tiêu vong"?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Xã hội tư bản', desc: 'Mâu thuẫn giai cấp gay gắt, không thể điều hòa', dim: true },
                { label: 'Cách mạng', desc: 'Giai cấp vô sản giành chính quyền nhà nước', accent: true },
                { label: 'Nhà nước vô sản', desc: '• Trấn áp lực lượng chống cách mạng\n• Tổ chức xây dựng xã hội mới\n• Từng bước xóa bỏ sự phân chia giai cấp', highlight: true },
                { label: 'Xóa bỏ giai cấp', desc: 'Mâu thuẫn giai cấp không còn cơ sở kinh tế' },
                { label: 'Nhà nước tự tiêu vong', desc: 'Mất lý do tồn tại — trả quyền lực về xã hội', gold: true },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  style={{ display: 'flex', gap: '0' }}
                >
                  {/* Left: connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '40px' }}>
                    <div style={{
                      width: step.highlight ? '18px' : '14px',
                      height: step.highlight ? '18px' : '14px',
                      borderRadius: '50%',
                      background: step.gold ? 'var(--gold)' : step.accent ? 'var(--red)' : step.highlight ? 'var(--red)' : 'rgba(255,255,255,0.3)',
                      border: `2px solid ${step.gold ? 'var(--gold)' : step.accent ? 'var(--red)' : step.highlight ? 'var(--red)' : 'rgba(255,255,255,0.2)'}`,
                      flexShrink: 0,
                      marginTop: '4px',
                      boxShadow: step.highlight ? '0 0 12px rgba(200,40,30,0.6)' : 'none',
                    }} />
                    {i < 4 && <div style={{ width: '2px', flex: 1, minHeight: step.highlight ? '60px' : '32px', background: step.highlight ? 'rgba(200,40,30,0.3)' : 'rgba(255,255,255,0.1)', margin: '4px 0' }} />}
                  </div>
                  {/* Right: content */}
                  <div style={{
                    paddingLeft: '14px',
                    paddingBottom: i < 4 ? '4px' : '0',
                    ...(step.highlight ? { background: 'rgba(200,40,30,0.08)', border: '1px solid rgba(200,40,30,0.25)', padding: '12px 16px', marginBottom: '4px', marginLeft: '14px' } : {}),
                  }}>
                    <div style={{ fontFamily: 'Oswald', fontSize: step.highlight ? '18px' : '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: step.gold ? 'var(--gold)' : step.accent ? 'var(--red)' : step.highlight ? 'var(--red)' : step.dim ? 'rgba(255,255,255,0.5)' : 'var(--cream)', marginBottom: '6px' }}>
                      {step.label}
                      {step.highlight && <span style={{ fontFamily: 'Bitter', fontSize: '11px', letterSpacing: '.1em', color: 'rgba(200,40,30,0.7)', marginLeft: '10px', textTransform: 'none', fontStyle: 'italic' }}>Thời kỳ quá độ</span>}
                    </div>
                    <div style={{ fontSize: '14px', color: step.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.55)', marginBottom: '12px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {step.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="fade-line muted" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
            "Nhà nước là một phạm trù lịch sử: có ra đời thì có mất đi." — Mác–Lênin
          </p>
        </div>
      </motion.section>



      <footer>★ CỖ MÁY NHÀ NƯỚC — Sản phẩm tương tác · Chương III: Nhà nước và Cách mạng xã hội ★</footer>
    </div>
  );
}
