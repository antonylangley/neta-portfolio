'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './ChimeraNavigation.module.css';

export function ChimeraNavigation() {
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
      // Keep keyboard users' focused controls visible until focus leaves.
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

  return <div className={styles.space}>
    <aside ref={panel} className={styles.panel} aria-label="Chimera navigation" data-expanded={expanded}>
      <div className={styles.topRow}>
        <Link href="/">← Home</Link>
        <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="chimera-contents" aria-label={expanded ? 'Collapse Chimera navigation' : 'Expand Chimera navigation'}>
          <span aria-hidden="true">{expanded ? '×' : '+'}</span>
        </button>
      </div>
      <div id="chimera-contents" hidden={!expanded} className={styles.contents}>
        <div className={styles.titleRow}>
          <span>Chimera</span>
          <span ref={progress} className={styles.progress} role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} />
        </div>
        <nav aria-label="Chimera case study">
          <a href="#overview">Overview</a>
          <a href="#problem">Problem</a>
          <a href="#research">Research</a>
          <a href="#process">Process &amp; Solution</a>
          <a href="#conclusion">Conclusion</a>
        </nav>
      </div>
    </aside>
  </div>;
}
