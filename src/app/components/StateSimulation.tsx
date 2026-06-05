import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

const ORGS = [
  {
    id: 'military',
    name: 'Đội vũ trang đặc biệt',
    sub: '(Quân đội, cảnh sát vũ trang...)',
    effects: { security: -60, disorder: +20},
    consequence: 'Biên giới dễ bị xâm phạm. Các cuộc nổi dậy khó kiểm soát.',
    arrows: ['AN NINH ↓↓↓', 'BẤT ỔN ↑'],
  },
  {
    id: 'police',
    name: 'Cơ quan cưỡng chế',
    sub: '(Cảnh sát, nhà tù, trại giam...)',
    effects: {
        dispute: +20,
        instability: +15
      },
    consequence: 'Xung đột dân sự tăng. Khó duy trì trật tự công cộng.',
    arrows: ['VI PHẠM LUẬT ↑↑', 'RỐI LOẠN ↑'],
  },
  {
    id: 'court',
    name: 'Tòa án',
    sub: '(Hệ thống xét xử, trọng tài...)',
    effects: {
      dispute: +40,
      instability: +20
    },
    consequence: 'Không còn cơ chế phân xử. Tranh chấp tồn đọng. Các bên tự giải quyết bằng sức mạnh.',
    arrows: ['TRANH CHẤP ↑↑↑', 'BẤT ỔN ↑↑'],
  },
  {
    id: 'law',
    name: 'Pháp luật',
    sub: '(Hiến pháp, luật thành văn, quy phạm...)',
    effects: {
      conflict: +40,
      dispute: +20,
      instability: +25
    },
    consequence: 'Không còn chuẩn mực chung. Mỗi nhóm hành động theo lợi ích riêng.',
    arrows: ['VI PHẠM LUẬT ↑', 'TRANH CHẤP ↑', 'BẤT ỔN ↑↑'],
  },
];

const COMBO_EFFECTS: Record<string, { title: string; desc: string }> = {
  'police+court': {
    title: 'Gỡ Cơ quan cưỡng chế + Tòa án',
    desc: 'Không còn người duy trì trật tự. Không còn người phân xử.\n\n⇒ Mâu thuẫn lợi ích không biến mất — chỉ mất cơ chế kiểm soát. Xung đột leo thang không có lối thoát thể chế.',
  },
  'court+law': {
    title: 'Gỡ Tòa án + Pháp luật',
    desc: 'Không còn cơ chế xác định ai đúng ai sai. Các nhóm lợi ích buộc phải dựa vào sức mạnh thực tế.\n\n⇒ Mâu thuẫn lợi ích không biến mất, chỉ mất cơ chế kiểm soát.',
  },
  'military+police': {
    title: 'Gỡ Đội vũ trang + Cơ quan cưỡng chế',
    desc: 'Toàn bộ lực lượng cưỡng chế biến mất.\n\n⇒ Không có gì ngăn cản xung đột giai cấp bùng nổ thành bạo lực.',
  },
};

function getComboKey(off: Set<string>): string | null {
  const ids = Array.from(off).sort().join('+');
  const combos: Record<string, string> = {
    'military+police': 'military+police',
    'court+police': 'police+court',
    'court+law': 'court+law',
  };
  return combos[ids] || null;
}

function calcMetrics(off: Set<string>) {
  let security = 100, dispute = 60, classconflict = 40, instability = 15;
  for (const id of off) {
    const org = ORGS.find(o => o.id === id);
    if (!org) continue;
    security      += (org.effects.security   ?? 0);
    dispute       += (org.effects.dispute    ?? 0);
    classconflict += (org.effects.lawbreak   ?? 0) + (org.effects.dispute ?? 0) * 0.5;
    instability   += (org.effects.instability ?? 0);
    instability   += (org.effects.disorder   ?? 0) * 0.5;
  }
  return {
    security:     Math.max(0, Math.min(100, security)),
    dispute:      Math.max(0, Math.min(100, dispute)),
    classconflict:Math.max(0, Math.min(100, classconflict)),
    instability:  Math.max(0, Math.min(100, instability)),
  };
}

function MetricBar({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  const color = danger
    ? value > 60 ? '#c8281e' : value > 30 ? '#d8a13a' : '#5a8a5a'
    : value < 40 ? '#c8281e' : value < 70 ? '#d8a13a' : '#5a8a5a';

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#6b5d4f]">{label}</span>
        <span className="font-['Oswald'] text-xs font-bold" style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-[#e4d9c4] rounded-full overflow-hidden border border-[#cdc0a8]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export const StateSimulation: React.FC = () => {
  const [off, setOff] = useState<Set<string>>(new Set());
  const [lastToggled, setLastToggled] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOff(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setLastToggled(id);
  };

  const metrics = calcMetrics(off);
  const allOff = off.size === 4;
  const comboKey = off.size === 2 ? getComboKey(off) : null;
  const combo = comboKey ? COMBO_EFFECTS[comboKey] : null;
  const lastOrg = ORGS.find(o => o.id === lastToggled && off.has(lastToggled));

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="wrap">
        <div className="kicker">Tầng 2 — Nhà nước là BIỂU HIỆN</div>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>
          Thí nghiệm: hãy thử "tắt" nhà nước
        </h2>
        <p className="lead muted">
          Nếu mâu thuẫn giai cấp đã được giải quyết, bộ máy cưỡng chế trở nên thừa thãi. Hãy gỡ từng cơ quan và quan sát điều gì xảy ra với xã hội.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* LEFT: Toggle organs */}
          <div>
            <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#d8a13a] mb-4">
              Bấm để gỡ / khôi phục từng công cụ cưỡng chế:
            </p>
            <div className="space-y-3">
              {ORGS.map(org => {
                const isOff = off.has(org.id);
                return (
                  <div
                    key={org.id}
                    onClick={() => toggle(org.id)}
                    className={clsx(
                      'relative p-4 border-2 cursor-pointer transition-all select-none',
                      isOff
                        ? 'border-[#c8281e] bg-[#f9e8e8] opacity-70'
                        : 'border-[#2a201c] bg-white hover:bg-[#f3ead7]',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={clsx(
                          "font-['Oswald'] font-bold uppercase tracking-wider text-base",
                          isOff ? 'line-through text-[#c8281e]' : 'text-[#171210]',
                        )}>
                          {isOff && '✖ '}{org.name}
                        </span>
                        <span className="block text-xs text-[#8a7a60] mt-0.5">{org.sub}</span>
                      </div>
                      <span className={clsx(
                        'text-xs font-bold uppercase tracking-widest px-2 py-1 rounded',
                        isOff ? 'bg-[#c8281e] text-white' : 'bg-[#e4d9c4] text-[#6b5d4f]',
                      )}>
                        {isOff ? 'ĐÃ GỠ' : 'ĐANG HOẠT ĐỘNG'}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Metrics */}
          <div>
            <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#d8a13a] mb-4">
              Chỉ số mô phỏng xã hội:
            </p>
            <div className="bg-white border-2 border-[#2a201c] p-6 mb-4">
              <MetricBar label="An ninh" value={metrics.security} />
              <MetricBar label="Tranh chấp" value={metrics.dispute} danger />
              <MetricBar label="Xung đột lợi ích" value={metrics.classconflict} danger />
              <MetricBar label="Bất ổn chính trị" value={metrics.instability} danger />
            </div>

            {/* Effect log */}
            <AnimatePresence mode="wait">
              {allOff ? null : combo ? (
                <motion.div
                  key="combo"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#fff3e0] border-2 border-[#d8a13a] p-4"
                >
                  <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#d8a13a] mb-2">
                    Hiệu ứng kết hợp
                  </p>
                  <p className="font-bold text-sm text-[#171210] mb-2">{combo.title}</p>
                  {combo.desc.split('\n\n').map((line, i) => (
                    <p key={i} className="text-sm text-[#5e3a2a] mb-1">{line}</p>
                  ))}
                </motion.div>
              ) : lastOrg && off.size > 0 ? (
                <motion.div
                  key={lastToggled}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#f9e8e8] border-2 border-[#c8281e] p-4"
                >
                  <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#c8281e] mb-2">
                    Hậu quả
                  </p>
                  <p className="text-sm text-[#5e0f0f] mb-3">{lastOrg.consequence}</p>
                  <div className="flex flex-wrap gap-2">
                    {lastOrg.arrows.map((a, i) => (
                      <span key={i} className="text-xs font-bold bg-[#c8281e] text-white px-2 py-1 rounded">
                        {a}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#f3ead7] border border-[#cdc0a8] p-4 text-sm italic text-[#8a7a60] text-center"
                >
                  Bấm vào một cơ quan để xem điều gì xảy ra…
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* All off — grand failure */}
        <AnimatePresence>
          {allOff && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-[#171210] text-[#f3ead7] border-4 border-[#c8281e] p-8 relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 text-8xl opacity-5 font-black">☭</div>
              <p className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#c8281e] mb-3">
                Mô phỏng thất bại
              </p>
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-black uppercase mb-6 leading-tight">
                Bạn đã xóa nhà nước.
              </h3>
              <div className="space-y-3 text-[#ece0c8] mb-6">
                <p>Nhưng <strong className="text-white">các giai cấp và lợi ích đối lập vẫn tồn tại.</strong></p>
                <p>Xung đột không biến mất.</p>
                <p>Xã hội buộc phải <strong className="text-white">tái lập một quyền lực mới để duy trì trật tự.</strong></p>
              </div>
              <div className="border-t border-[#3a3028] pt-6 italic text-[#d8a13a]">
                <p className="text-sm mb-2">Đó là lý do Lênin cho rằng:</p>
                <p className="text-base font-semibold text-white not-italic">
                  Sự tồn tại của nhà nước là <em className="text-[#ffd98a]">biểu hiện</em> của những mâu thuẫn giai cấp <em className="text-[#ffd98a]">chưa được giải quyết.</em>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};
