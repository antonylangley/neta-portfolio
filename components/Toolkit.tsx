import Image from 'next/image';
import styles from './Toolkit.module.css';

const tools = [
  { id: 'figma', name: 'Figma' },
  { id: 'canva', name: 'Canva' },
  { id: 'photoshop', name: 'Adobe Photoshop' },
  { id: 'illustrator', name: 'Adobe Illustrator' },
  { id: 'notion', name: 'Notion' },
  { id: 'miro', name: 'Miro' },
  { id: 'claude', name: 'Claude' },
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'vscode', name: 'VS Code' },
  { id: 'github', name: 'GitHub' },
];

export function Toolkit() {
  return <section className={styles.toolkit} aria-labelledby="toolkit-title">
    <ul className={styles.dock} aria-label="Tools I use">
      {tools.map(tool => <li key={tool.id} className={`${styles.item} ${tool.id === 'claude' ? styles.divider : ''}`}>
        <button type="button" className={`${styles.icon} ${styles[tool.id]}`} aria-label={tool.name}>
          <Image src={`/toolkit/${tool.id}.svg`} alt="" width={44} height={44} />
        </button>
        <span className={styles.label} aria-hidden="true">{tool.name}</span>
      </li>)}
    </ul>
    <h2 id="toolkit-title">Toolkit</h2>
  </section>;
}
