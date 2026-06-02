import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

type Scenario = 'slave' | 'peasant' | 'worker' | null;

const scenarios = {
  slave: {
    title: 'Chủ nô ↔ Nô lệ',
    masterInterests: ['Giữ quyền sở hữu nô lệ', 'Duy trì lao động miễn phí', 'Bảo vệ tài sản'],
    slaveInterests: ['Được tự do', 'Chấm dứt bị bóc lột', 'Có quyền sở hữu bản thân'],
    solutions: [
      { label: 'Tăng khẩu phần', key: 'ration' },
      { label: 'Giảm giờ làm', key: 'hours' },
      { label: 'Thưởng vật chất', key: 'reward' },
    ],
    successMsg: 'Điều kiện sống cải thiện',
    failureMsg: ['Nô lệ vẫn là nô lệ', 'Chủ nô vẫn sở hữu nô lệ'],
    conclusion: 'Mâu thuẫn cơ bản vẫn tồn tại.',
  },
  peasant: {
    title: 'Địa chủ ↔ Nông dân',
    masterInterests: ['Giữ quyền sở hữu ruộng đất', 'Tối đa hóa thu nhập', 'Bảo vệ tài sản'],
    slaveInterests: ['Có quyền sở hữu ruộng đất', 'Giảm tô thuế', 'Cải thiện sinh kế'],
    solutions: [
      { label: 'Giảm tô', key: 'reduce' },
      { label: 'Miễn thuế', key: 'exempt' },
      { label: 'Hỗ trợ mùa màng', key: 'support' },
    ],
    successMsg: 'Giảm căng thẳng tạm thời',
    failureMsg: ['Quyền sở hữu ruộng đất không đổi'],
    conclusion: 'Mâu thuẫn vẫn tồn tại.',
  },
  worker: {
    title: 'Tư sản ↔ Công nhân',
    masterInterests: ['Tối đa lợi nhuận', 'Kiểm soát tư liệu sản xuất', 'Giảm chi phí lao động'],
    slaveInterests: ['Tăng lương', 'Phúc lợi xã hội', 'Giảm giờ làm'],
    solutions: [
      { label: 'Tăng lương', key: 'wage' },
      { label: 'Giảm giờ làm', key: 'hours' },
      { label: 'Thưởng cuối năm', key: 'bonus' },
    ],
    successMsg: 'Điều kiện lao động cải thiện',
    failureMsg: ['Doanh nghiệp vẫn sở hữu tư liệu sản xuất', 'Công nhân vẫn bán sức lao động'],
    conclusion: 'Mâu thuẫn cơ bản chưa mất đi.',
  },
};

export const ContradictionResolver: React.FC = () => {
  const [selected, setSelected] = useState<Scenario>(null);
  const [attempted, setAttempted] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<Scenario>>(new Set());

  const handleAttempt = () => {
    if (selected) {
      setAttempted(true);
      setCompletedScenarios(prev => new Set([...prev, selected]));
      setTimeout(() => {
        if (completedScenarios.size < 2) {
          setSelected(null);
          setAttempted(false);
        }
      }, 3000);
    }
  };

  const allCompleted = completedScenarios.size === 3;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <div className="wrap">
        <div className="kicker text-[#c8281e]">Tầng 1.5 — THỬ ĐIỀU HÒA</div>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>
          Nếu các giai cấp có thể dung hòa lợi ích với nhau,
          <br />
          <em>liệu nhà nước có cần xuất hiện?</em>
        </h2>
        <p className="lead muted mb-12">Chọn một mâu thuẫn lịch sử và thử điều hòa. Xem liệu có thể xóa bỏ được nó không.</p>

        {!allCompleted ? (
          <>
            {/* Scenario Selection */}
            <div className="mb-12">
              <div className="grid gap-4 sm:grid-cols-3">
                {(Object.keys(scenarios) as Scenario[]).map((key) => (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setSelected(key);
                      setAttempted(false);
                    }}
                    className={clsx(
                      'relative p-6 border-4 transition-all text-left font-["Oswald"] uppercase tracking-wider text-lg font-bold',
                      selected === key && !attempted
                        ? 'border-[#c8281e] bg-[#c8281e] text-white shadow-[6px_6px_0_#171210]'
                        : 'border-[#171210] bg-white text-[#171210] hover:shadow-[4px_4px_0_#171210]',
                      completedScenarios.has(key) && 'opacity-50 pointer-events-none',
                    )}
                    disabled={completedScenarios.has(key)}
                  >
                    {scenarios[key].title}
                    {completedScenarios.has(key) && (
                      <CheckCircle2 className="absolute top-3 right-3 w-6 h-6 text-green-600" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Scenario Content */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-12"
                >
                  <div className="bg-white border-4 border-[#171210] shadow-[8px_8px_0_#c8281e] overflow-hidden">
                    <div className="grid sm:grid-cols-2">
                      {/* Side 1 */}
                      <div className="p-8 border-b-4 sm:border-b-0 sm:border-r-4 border-[#171210]">
                        <h3 className="font-['Oswald'] text-sm font-black uppercase tracking-widest text-[#c8281e] mb-4">
                          {selected === 'slave' ? 'Chủ nô' : selected === 'peasant' ? 'Địa chủ' : 'Tư sản'}
                        </h3>
                        <div className="space-y-3">
                          {scenarios[selected].masterInterests.map((interest, i) => (
                            <div key={i} className="flex gap-3 items-start">
                              <span className="text-[#c8281e] font-black text-lg mt-1">+</span>
                              <p className="text-[#171210] text-sm leading-tight">{interest}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Side 2 */}
                      <div className="p-8">
                        <h3 className="font-['Oswald'] text-sm font-black uppercase tracking-widest text-[#c8281e] mb-4">
                          {selected === 'slave' ? 'Nô lệ' : selected === 'peasant' ? 'Nông dân' : 'Công nhân'}
                        </h3>
                        <div className="space-y-3">
                          {scenarios[selected].slaveInterests.map((interest, i) => (
                            <div key={i} className="flex gap-3 items-start">
                              <span className="text-[#c8281e] font-black text-lg mt-1">+</span>
                              <p className="text-[#171210] text-sm leading-tight">{interest}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Solutions */}
                    {!attempted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 bg-[#f3ead7] border-t-4 border-[#171210]"
                      >
                        <p className="font-['Oswald'] text-sm font-black uppercase tracking-widest text-[#171210] mb-6">
                          Thử Điều Hòa
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {scenarios[selected].solutions.map((sol) => (
                            <button
                              key={sol.key}
                              onClick={handleAttempt}
                              className="border-2 border-[#171210] bg-white px-4 py-3 font-['Oswald'] font-bold uppercase tracking-wide text-xs text-[#171210] hover:bg-[#171210] hover:text-[#f3ead7] transition-colors"
                            >
                              {sol.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Result */}
                    {attempted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-[#f3ead7] border-t-4 border-[#171210]"
                      >
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <p className="font-['Oswald'] font-bold text-[#171210]">
                              {scenarios[selected].successMsg}
                            </p>
                          </div>
                          {scenarios[selected].failureMsg.map((msg, i) => (
                            <div key={i} className="flex gap-3 items-start">
                              <XCircle className="w-6 h-6 text-[#c8281e] flex-shrink-0 mt-1" />
                              <p className="font-['Oswald'] font-bold text-[#171210]">{msg}</p>
                            </div>
                          ))}
                          <div className="mt-6 pt-6 border-t-2 border-[#171210]">
                            <p className="font-['Bitter'] text-[#171210] italic">
                              <strong>Kết quả:</strong> {scenarios[selected].conclusion}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="flex justify-center gap-2 mb-8">
              {(Object.keys(scenarios) as Scenario[]).map((key) => (
                <div
                  key={key}
                  className={clsx(
                    'h-2 w-8 transition-colors',
                    completedScenarios.has(key) ? 'bg-green-600' : 'bg-[#d8a13a]',
                  )}
                />
              ))}
            </div>
          </>
        ) : (
          /* Grand Conclusion */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#c8281e] border-4 border-[#171210] p-12 shadow-[8px_8px_0_#171210] max-w-2xl mx-auto"
          >
            <h3 className="font-['Oswald'] text-3xl font-black uppercase tracking-widest text-white mb-8 text-center">
              Tại sao không thể điều hòa?
            </h3>

            <div className="bg-white p-8 mb-8 text-[#171210] font-['Bitter'] text-lg leading-relaxed">
              <p className="mb-4">
                Theo quan điểm Mác – Lênin, <strong>mâu thuẫn giai cấp không phải là mâu thuẫn cá nhân.</strong>
              </p>
              <p className="mb-4">
                Nó bắt nguồn từ <strong>địa vị kinh tế</strong> và <strong>lợi ích cơ bản đối lập</strong> giữa các giai cấp.
              </p>
              <p>
                Vì vậy các biện pháp cải thiện chỉ có thể <strong>làm dịu xung đột</strong>, không thể <strong>xóa bỏ nguyên nhân sâu xa.</strong>
              </p>
            </div>

            <div className="space-y-4 text-white text-center font-['Oswald'] text-sm italic tracking-wide">
              <p>"những giai cấp có quyền lợi kinh tế mâu thuẫn nhau"</p>
              <p>"những mâu thuẫn giai cấp không thể điều hòa được"</p>
            </div>

            <div className="mt-8 text-center text-white font-['Oswald'] text-2xl font-bold">
              ∴ Nhà nước là tất yếu
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
