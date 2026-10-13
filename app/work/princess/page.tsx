import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import cover from '@/public/princess/title-cover-v2.png';
import styles from './princess.module.css';

const gameUrl = 'https://play.unity.com/en/games/28439746-dbe4-42bc-bc09-3b1c1f5f9924/hci-princess-castle-escape-final';

export const metadata: Metadata = {
  title: 'HCI Princess Castle Escape — Neta Rogovsky',
  description: 'A browser-playable Unity WebGL game project.',
};

export default function PrincessCastleEscapePage() {
  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.back} href="/#project-princess">← Portfolio</Link>
        <div className={styles.titleBlock}>
          <p>Interactive game · Unity WebGL</p>
          <h1>HCI Princess<br />Castle Escape</h1>
        </div>
        <a className={styles.playLink} href={gameUrl} target="_blank" rel="noopener noreferrer">Play game ↗</a>
      </header>

      <a className={styles.cover} href={gameUrl} target="_blank" rel="noopener noreferrer" aria-label="Play HCI Princess Castle Escape on Unity Play">
        <Image src={cover} alt="The player approaches a princess while a zombie follows through a stone castle corridor" fill priority sizes="(max-width: 760px) 94vw, calc(100vw - 330px)" />
        <span className={styles.coverAction}>Enter the castle <b>↗</b></span>
      </a>

      <p className={styles.synopsis}>HCI Princess Castle Escape turns human-computer interaction principles into a short Unity adventure. Players restore a broken castle by sorting color-coded files and repairing a cluttered navigation menu, learning how information architecture, clear labeling, and visual hierarchy make digital systems easier to understand.</p>

      <aside className={styles.timeline} aria-labelledby="timeline-title">
        <p id="timeline-title">Project timeline</p>
        <ol>
          <li><span>01</span><div><strong>Concept</strong><small>Interaction and game direction</small></div></li>
          <li><span>02</span><div><strong>Build</strong><small>Unity game development</small></div></li>
          <li><span>03</span><div><strong>Release</strong><small>Playable WebGL final</small></div></li>
        </ol>
      </aside>
    </div>
  </main>;
}
