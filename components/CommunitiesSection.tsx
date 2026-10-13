'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { communities, type Community } from '@/data/communities';
import { CommunityModal } from './CommunityModal';
import styles from './CommunitiesSection.module.css';

export function CommunitiesSection() {
  const [selected, setSelected] = useState<Community | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    const openHash = (hash: string, trigger?: HTMLElement) => {
      const community = communities.find(item => hash === `#community-${item.id}`);
      if (!community) return;
      opener.current = trigger ?? document.getElementById(`community-${community.id}`);
      setSelected(community);
    };
    const hashchange = () => openHash(window.location.hash);
    // Also reopen a detail when its footer link already matches the current hash.
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname) openHash(url.hash, link);
    };
    const frame = requestAnimationFrame(hashchange);
    window.addEventListener('hashchange', hashchange);
    document.addEventListener('click', click, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', hashchange);
      document.removeEventListener('click', click, true);
    };
  }, []);
  return <LayoutGroup id="communities">
    <section className={styles.section} id="communities" aria-labelledby="communities-title">
      <h2 id="communities-title">Community</h2>
      <div className={styles.grid}>{communities.map(community => <motion.button
        key={community.id} id={`community-${community.id}`} style={{ scrollMarginTop: 120 }} className={styles.card} layoutId={reduced ? undefined : community.id}
        aria-label={`Open details for ${community.name}`} aria-haspopup="dialog"
        whileHover={reduced ? undefined : { y: -5, scale: 1.02 }}
        onClick={event => { opener.current = event.currentTarget; setSelected(community); }}
      ><Image src={community.logo} alt={`${community.name} logo`} width={220} height={220} /></motion.button>)}</div>
    </section>
    <AnimatePresence onExitComplete={() => opener.current?.focus()}>
      {selected && <CommunityModal key={selected.id} community={selected} onClose={close} reduced={!!reduced} />}
    </AnimatePresence>
  </LayoutGroup>;
}
