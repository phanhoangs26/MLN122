// src/components/StampBadge.tsx
// Con dấu hộ chiếu — nét đứt khi chưa đạt, nét liền + màu đỏ mộc khi hoàn thành

import React from 'react';
import { motion } from 'motion/react';

interface StampBadgeProps {
  label: string;       // text hiển thị trong stamp
  achieved: boolean;   // đã đạt chưa
  size?: number;       // px
  number?: string;     // số chương (I, II, III)
  className?: string;
}

export function StampBadge({
  label,
  achieved,
  size = 96,
  number,
  className = '',
}: StampBadgeProps) {
  return (
    <motion.div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      initial={false}
      animate={achieved ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-label={`${label} — ${achieved ? 'Đã hoàn thành' : 'Chưa hoàn thành'}`}
        role="img"
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={achieved ? '#A3323A' : 'rgba(192,138,46,0.4)'}
          strokeWidth={achieved ? 2.5 : 1.5}
          strokeDasharray={achieved ? 'none' : '4 3'}
          style={{ transition: 'stroke 0.4s ease, stroke-dasharray 0.4s ease' }}
        />
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill={achieved ? 'rgba(163,50,58,0.12)' : 'transparent'}
          stroke={achieved ? '#A3323A' : 'rgba(192,138,46,0.25)'}
          strokeWidth={achieved ? 1.5 : 1}
          strokeDasharray={achieved ? 'none' : '2 2'}
          style={{ transition: 'all 0.4s ease' }}
        />

        {/* Star decoration (top) */}
        {achieved && (
          <>
            <text x="50" y="22" textAnchor="middle" fontSize="8" fill="#A3323A" fontFamily="serif">★ ★ ★</text>
            <text x="50" y="83" textAnchor="middle" fontSize="8" fill="#A3323A" fontFamily="serif">★ ★ ★</text>
          </>
        )}

        {/* Number */}
        {number && (
          <text
            x="50"
            y="42"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Fraunces, Georgia, serif"
            fill={achieved ? '#A3323A' : 'rgba(192,138,46,0.5)'}
            style={{ transition: 'fill 0.4s ease' }}
          >
            {number}
          </text>
        )}

        {/* Label */}
        <text
          x="50"
          y={number ? '64' : '55'}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fontWeight="600"
          fontFamily="IBM Plex Sans, sans-serif"
          letterSpacing="1.5"
          fill={achieved ? '#A3323A' : 'rgba(242,234,215,0.4)'}
          style={{ transition: 'fill 0.4s ease' }}
        >
          {label.toUpperCase()}
        </text>

        {/* ✓ checkmark when achieved */}
        {achieved && (
          <motion.text
            x="50"
            y="52"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="rgba(163,50,58,0.25)"
            fontFamily="serif"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            ✓
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
