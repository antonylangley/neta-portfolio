'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import shpeSymbol from '@/public/shpe/shpe-symbol.png';
import styles from './ShpeLoader.module.css';

export function ShpeLoader() {
  const [state, setState] = useState<'visible' | 'leaving' | 'hidden'>('visible');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const leaveTimer = window.setTimeout(() => setState('leaving'), reducedMotion ? 120 : 1650);
    const hideTimer = window.setTimeout(() => {
      setState('hidden');
      document.body.style.overflow = previousOverflow;
    }, reducedMotion ? 300 : 2250);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (state === 'hidden') return null;
  return <div className={styles.loader} data-state={state} role="status" aria-label="Loading the SHPE case study">
    <div className={styles.glow} aria-hidden="true" />
    <Image className={styles.symbol} src={shpeSymbol} alt="" priority sizes="(max-width: 700px) 160px, 250px" />
  </div>;
}
