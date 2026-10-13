'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './ShpeNavigation.module.css';

export function ShpeNavigation() {
  const [expanded, setExpanded] = useState(true);
  const panel = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let opacity = 1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(max, Math.max(0, window.scrollY));
      const delta = y - lastY;
      if (y <= 8 || delta < 0) opacity = 1;
      else if (delta > 0) opacity = Math.max(0, opacity - delta / 100);
      lastY = y;
      const visibleOpacity = panel.current?.querySelector(':focus-visible') ? 1 : opacity;
      panel.current?.style.setProperty('--nav-opacity', String(visibleOpacity));
      if (panel.current) panel.current.inert = visibleOpacity === 0;
      const percent = max ? y / max * 100 : 0;
      progress.current?.style.setProperty('--progress', `${percent}%`);
      progress.current?.setAttribute('aria-valuenow', String(Math.round(percent)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <aside ref={panel} className={styles.panel} aria-label="SHPE case study navigation" data-expanded={expanded}>
    <div className={styles.topRow}>
      <Link href="/">← Home</Link>
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="shpe-contents" aria-label={expanded ? 'Collapse SHPE navigation' : 'Expand SHPE navigation'}>
        <span aria-hidden="true">{expanded ? '×' : '+'}</span>
      </button>
    </div>
    <div id="shpe-contents" hidden={!expanded} className={styles.contents}>
      <div className={styles.titleRow}>
        <span>SHPE</span>
        <span ref={progress} className={styles.progress} role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} />
      </div>
      <nav aria-label="SHPE case study sections" onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a') && window.matchMedia('(max-width: 1100px)').matches) setExpanded(false);
      }}>
        <a href="#overview">Overview</a>
        <a href="#problem">Problem</a>
        <a href="#research">UX Audit</a>
        <a href="#process">Process &amp; Solution</a>
        <a href="#conclusion">Collaboration</a>
      </nav>
    </div>
  </aside>;
}
