import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import shpe from '@/public/images/projects/shpe.jpg';
import chimera from '@/public/images/projects/chimera.png';
import rolltech from '@/public/images/projects/rolltech.png';
import wick from '@/public/images/projects/wick.jpg';
import castleEscape from '@/public/images/projects/castle-escape.png';
import aiGlasses from '@/public/images/projects/ai-glasses.webp';
import styles from './ProductSection.module.css';

function StatusPill({ children }: { children: string }) {
  return <span className={styles.statusPill}>{children}</span>;
}

type ProjectCopyProps = {
  name: string;
  description: string;
  tags: string;
  compact?: boolean;
};

function ProjectCopy({ name, description, tags, compact = false }: ProjectCopyProps) {
  return <div className={[styles.copy, compact ? styles.compactCopy : ''].filter(Boolean).join(' ')}>
    <p className={styles.caption}><strong>{name}</strong>—{description}</p>
    <p className={styles.tags}>{tags}</p>
  </div>;
}

type ArtworkProps = {
  image: StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  status?: string;
};

function Artwork({ image, alt, className = '', priority = false, sizes, status }: ArtworkProps) {
  return <div className={[styles.artwork, className].filter(Boolean).join(' ')}>
    <Image
      src={image}
      alt={alt}
      fill
      priority={priority}
      quality={95}
      sizes={sizes}
    />
    {status && <StatusPill>{status}</StatusPill>}
  </div>;
}

const equalSizes = '(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc((100vw - 72px) / 2), calc(42vw - 20px)';
const wideSizes = '(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc((100vw - 72px) / 2), calc(58vw - 42px)';
const narrowSizes = '(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc((100vw - 72px) / 2), calc(42vw - 30px)';

export function ProductSection() {
  return <section className={styles.section} id="product" aria-labelledby="product-title">
    <h2 id="product-title">Product</h2>

    <div className={styles.rows}>
      <div className={[styles.row, styles.rowNarrowWide].join(' ')}>
        <article className={styles.project} id="project-shpe">
          <Link className={styles.projectLink} href="/work/shpe" aria-label="SHPE NJIT: read the case study">
            <Artwork
              image={shpe}
              alt="SHPE NJIT social app home screen for iOS and Android"
              className={[styles.narrowArtwork, styles.shpeArtwork].join(' ')}
              priority
              sizes={narrowSizes}
            />
            <ProjectCopy name="SHPE NJIT" description="A social app connecting members and alumni." tags="Product Design, Identity, Mobile" />
          </Link>
        </article>

        <article className={styles.project} id="project-chimera">
          <Link className={styles.projectLink} href="/work/chimera" aria-label="Chimera: read the case study">
            <Artwork
              image={chimera}
              alt="Three Chimera home security mobile screens against a cloudy blue sky"
              className={[styles.wideArtwork, styles.chimeraArtwork].join(' ')}
              priority
              sizes={wideSizes}
            />
            <ProjectCopy name="Chimera" description="A simplified home security experience." tags="Product Design, Identity, Mobile" />
          </Link>
        </article>
      </div>

      <div className={[styles.row, styles.rowWideNarrow].join(' ')}>
        <article className={styles.project} id="project-rolltech">
          <Artwork
            image={rolltech}
            alt="RollTech NJIT admissions communication dashboard shown over the NJIT campus"
            className={[styles.wideArtwork, styles.rolltechArtwork].join(' ')}
            sizes={wideSizes}
          />
          <ProjectCopy name="RollTech" description="NJIT Admissions communication system made simple." tags="Product Design, Identity, Web, User Research" />
        </article>

        <article className={styles.project} id="project-wick">
          <a className={styles.projectLink} href="https://wick.courses" target="_blank" rel="noopener noreferrer" aria-label="Visit the Wick role-play practice website">
            <Artwork
              image={wick}
              alt="Wick role-play practice interface displayed on a MacBook"
              className={[styles.narrowArtwork, styles.wickArtwork].join(' ')}
              sizes={narrowSizes}
            />
            <ProjectCopy name="Wick" description="Role-play practice for stepping in as a bystander." tags="Hackathon Build, Web" />
          </a>
        </article>
      </div>

      <div className={[styles.row, styles.rowTertiary].join(' ')}>
        <article className={styles.project} id="project-castle-escape">
          <Link className={styles.projectLink} href="/work/princess" aria-label="Castle Escape: open the project">
            <Artwork
              image={castleEscape}
              alt="Castle Escape game scene with the player, archivist, and enemy inside a castle"
              className={styles.tertiaryArtwork}
              sizes={equalSizes}
            />
            <ProjectCopy compact name="Castle Escape" description="A game where every room teaches a UX design principle." tags="Unity, C#, NavMesh AI, WebGL" />
          </Link>
        </article>

        <article className={styles.project} id="project-ai-glasses">
          <Artwork
            image={aiGlasses}
            alt="Meta Ray-Ban smart glasses photographed against purple and pink light"
            className={[styles.tertiaryArtwork, styles.aiArtwork].join(' ')}
            sizes={equalSizes}
            status="Research in progress"
          />
          <ProjectCopy compact name="AI Glasses" description="Research in progress." tags="UX Research, Accessibility" />
        </article>
      </div>
    </div>
  </section>;
}
