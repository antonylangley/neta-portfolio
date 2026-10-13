import Link from 'next/link';
import { Starfield } from './Starfield';
import styles from './ContactFooter.module.css';

type ContactFooterVariant = 'default' | 'landing' | 'about';

export function ContactFooter({ variant = 'default' }: { variant?: ContactFooterVariant }) {
  const landing = variant === 'landing';
  return <footer className={`${styles.footer} ${landing ? styles.landing : ''}`} id="connect" aria-label="Portfolio footer">
    <Starfield />
    <nav className={styles.columns} aria-label="Footer navigation">
      <div className={styles.brand}>
        <Link className={styles.heading} href="/#top">Neta Rogovsky</Link>
        <Link href="/#top" className={styles.musicStar} aria-label="Back to the top" />
      </div>
      <div className={styles.product}>
        <Link className={styles.heading} href="/#product">Product</Link>
        <ul>
          <li><Link href="/#project-shpe">SHPE</Link></li>
          <li><Link href="/work/chimera">Chimera</Link></li>
          <li><button disabled title="RollTech case study coming soon">RollTech</button></li>
          <li><Link href="/work/princess">Castle Escape</Link></li>
          {landing && <li><a href="https://wick.courses" target="_blank" rel="noopener noreferrer">Wick</a></li>}
          <li><Link href="/#project-ai-glasses">AI Glasses</Link></li>
        </ul>
      </div>
      <div className={styles.community}>
        <Link className={styles.heading} href="/#communities">Community</Link>
        <ul>
          <li><Link href="/#community-accessibility-lab">Community-Centered<br />Accessibility &amp; Innovation Lab</Link></li>
          <li><Link href="/#community-lspace">NASA L&apos;SPACE</Link></li>
          <li><Link href="/#community-shpe">Society of Hispanic<br />Professional Engineers (SHPE)</Link></li>
          <li><Link href="/#community-school-of-rock">School of Rock</Link></li>
        </ul>
      </div>
      <div className={styles.contact}>
        <Link className={styles.heading} href="/about">{landing ? 'Information' : 'Contact'}</Link>
        <ul>
          <li><a href="mailto:nr598@njit.edu">Email</a></li>
          <li><button disabled title="Résumé coming soon">Resume</button></li>
          <li><a href="https://www.linkedin.com/in/neta-rogovsky/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          {landing && <li className={styles.talk}><a href="mailto:nr598@njit.edu">Let&apos;s talk →</a></li>}
        </ul>
      </div>
    </nav>
  </footer>;
}
