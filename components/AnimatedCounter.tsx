'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 650,
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [animatedValue, setAnimatedValue] = useState<number>(value);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || duration <= 0) {
      return;
    }

    let rafId = 0;
    const startTime = performance.now();
    const startVal = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  const displayValue = duration <= 0 ? value : animatedValue;

  return (
    <span className={`tabular-nums ${className}`}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
