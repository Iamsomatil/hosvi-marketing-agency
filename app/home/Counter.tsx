'use client';

import { useEffect, useRef, useState } from 'react';

export function Counter({ 
  target, 
  label, 
  suffix = '' 
}: { 
  target: number; 
  label: string; 
  suffix?: string 
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    
    observer.observe(node);
    return () => observer?.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    
    let raf = 0;
    const start = performance.now();
    const duration = 1400; // ms
    const startValue = 0;
    const endValue = target;
    
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      setValue(current);
      
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(endValue);
      return;
    }
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto inline-flex items-center justify-center rounded-full px-6 py-4 text-4xl font-extrabold tabular-nums bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 text-slate-900">
        {value}
        {suffix && <span className="ml-1 text-2xl">{suffix}</span>}
      </div>
      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}
