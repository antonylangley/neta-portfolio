import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import styles from './CaseStudy.module.css';

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className={styles.heading}>{children}</h2>;
}

export function LabeledCopy({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.labeledCopy} data-case-study-labeled-copy><p className={styles.label}>{label}</p><div className={styles.copy}>{children}</div></div>;
}

export function ProjectMetadata({ items }: { items: { label: string; lines: string[] }[] }) {
  return <dl className={styles.metadata}>{items.map(item => <div key={item.label}><dt>{item.label}</dt>{item.lines.map(line => <dd key={line}>{line}</dd>)}</div>)}</dl>;
}

// Native image links keep the full supplied compositions available at readable
// resolution on small screens, without clipping or introducing a new viewer.
export function ImageShowcase({ src, alt, priority = false, sizes = '(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 87vw, 1252px', className = '' }: {
  src: StaticImageData; alt: string; priority?: boolean; sizes?: string; className?: string;
}) {
  return <figure className={`${styles.showcase} ${className}`}><a href={src.src} target="_blank" rel="noopener noreferrer" aria-label={`${alt.replace(/\.$/, '')}. Open full-size image in a new tab`}><Image src={src} alt={alt} sizes={sizes} priority={priority} /></a></figure>;
}

export function NumberedFindings({ items }: { items: { title: string; description: string }[] }) {
  return <ol className={styles.findings}>{items.map((item, index) => <li key={item.title}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><span className={styles.findingDescription}>{item.description}</span></span></li>)}</ol>;
}

export function DesignDecision({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className={styles.decision}><h3>{number} / {title}</h3><div className={styles.copy}>{children}</div></div>;
}

export function CompetitorColumn({ name, source, position, findings }: { name: string; source: StaticImageData; position: 'left' | 'right'; findings: string[] }) {
  return <section className={styles.competitor} aria-label={name}>
    <div className={`${styles.competitorLogo} ${position === 'right' ? styles.logoRight : ''}`}>
      <Image src={source} alt={`${name} logo`} sizes="666px" />
    </div>
    <h4>What stood out</h4><ul>{findings.map(finding => <li key={finding}>{finding}</li>)}</ul>
  </section>;
}
