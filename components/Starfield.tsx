'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

export function Starfield() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const sync = () => { element.dataset.resting = String(!visible || document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <div ref={ref} className="starfield" aria-hidden="true">
    {Array.from({ length: 42 }, (_, i) => <i key={i} style={{
      left: `${(i * 73 + 17) % 100}%`, top: `${(i * 41 + 9) % 100}%`,
      '--twinkle-duration': `${6 + i % 7}s`, '--twinkle-delay': `${-i * 1.7}s`,
      '--star-size': `${i % 5 === 0 ? 2 : 1}px`,
    } as CSSProperties} />)}
  </div>;
}
