'use client';

import { useEffect, useRef } from 'react';

export function HeroFade() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const hero = overlay?.closest<HTMLElement>('.hero');
    if (!overlay || !hero) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const heroHeight = Math.max(1, hero.offsetHeight);
      const fadeStart = heroHeight * 0.28;
      const fadeEnd = heroHeight * 0.82;
      const fadeDistance = fadeEnd - fadeStart;
      const progress = Math.min(1, Math.max(0, (window.scrollY - fadeStart) / fadeDistance));
      overlay.style.opacity = String(progress);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={overlayRef} className="hero-fade" aria-hidden="true" />;
}
