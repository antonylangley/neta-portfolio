'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { Community } from '@/data/communities';
import styles from './CommunitiesSection.module.css';

export function CommunityModal({ community, onClose, reduced }: { community: Community; onClose: () => void; reduced: boolean }) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    const focusable = () => Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]') || []);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const items = focusable();
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const contain = (event: FocusEvent) => { if (!dialog.current?.contains(event.target as Node)) close.current?.focus(); };
    document.addEventListener('keydown', keydown);
    document.addEventListener('focusin', contain);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); document.removeEventListener('focusin', contain); };
  }, [onClose]);
  return <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div ref={dialog} role="dialog" aria-modal="true" aria-labelledby={`title-${community.id}`}
      layoutId={reduced ? undefined : community.id} className={`${styles.modal} ${community.projects.length > 1 ? styles.wide : ''}`}
      transition={{ type: 'spring', stiffness: 330, damping: 34 }}>
      <button ref={close} className={styles.close} aria-label="Close" onClick={onClose}>×</button>
      <header className={styles.header}>
        <div><h2 id={`title-${community.id}`}>{community.role}</h2><p className={styles.organization}>{community.name}</p></div>
        <div className={styles.logo}><Image src={community.logo} alt={`${community.name} logo`} width={150} height={150} /></div>
        <p className={styles.summary}>{community.summary}</p>
      </header>
      <div className={styles.projects}>{community.projects.map(project => <section key={project.title}>
        <h3>{project.title}</h3><p className={styles.dates}>{project.dates}</p>
        <ul>{project.description.map(text => <li key={text}>{text}</li>)}</ul>
        <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </section>)}</div>
      {community.link && <footer className={styles.footer}><a href={community.link.href}>{community.link.label} <span aria-hidden="true">→</span></a></footer>}
    </motion.div>
  </motion.div>;
}
