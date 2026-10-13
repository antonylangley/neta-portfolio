'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import profile from '@/public/about/graphite-profile.png';
import portrait from '@/public/about/graphite-portrait.jpg';
import stillLife from '@/public/about/graphite-still-life.png';
import eyes from '@/public/about/IMG_0665.png';
import records from '@/public/about/music-records.png';
import singing from '@/public/about/music-performance.png';
import bass from '@/public/about/music-bass.png';
import garment from '@/public/about/fashion-garment.png';
import design from '@/public/about/fashion-design.png';
import moodboard from '@/public/about/fashion-moodboard.png';

type GalleryImage = { src: StaticImageData; alt: string };
type PracticeColumnProps = { id?: string; kind: string; title: string; caption: string; images: GalleryImage[]; expanded: boolean };

function GalleryImageFrame({ image }: { image: GalleryImage }) {
  return <div className="practice-image-frame">
    <Image src={image.src} alt={image.alt} sizes="(max-width: 700px) 92vw, (max-width: 1800px) 30vw, 540px" />
  </div>;
}

function PracticeColumn({ id, kind, title, caption, images, expanded }: PracticeColumnProps) {
  return <figure className={`practice-column ${kind}`} id={id} data-expanded={expanded}>
    <figcaption><strong>{title}</strong><p>{caption}</p></figcaption>
    <GalleryImageFrame image={images[0]} />
    <div className="practice-more" data-expanded={expanded} aria-hidden={!expanded}>
      <div className="practice-more-inner">
        {images.slice(1).map(image => <GalleryImageFrame key={image.alt} image={image} />)}
      </div>
    </div>
  </figure>;
}

export function CreativePractice() {
  const [expanded, setExpanded] = useState(false);

  return <section className="creative-practice" aria-labelledby="practice-title">
    <div className="practice-heading">
      <h2 id="practice-title">Creative Practice <span>| Gallery</span></h2>
      <button className="practice-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? 'See less' : 'See more'}
      </button>
    </div>
    <div className="practice-grid">
      <PracticeColumn kind="graphite" expanded={expanded} title="Drawn by hand" caption="Graphite sketches exploring portraits, still life, texture, and form." images={[
        { src: profile, alt: 'Graphite profile study with botanical and textured details' },
        { src: portrait, alt: 'Graphite portrait of a child blowing a soap bubble' },
        { src: stillLife, alt: 'Graphite still life with a skull, flower, and perfume bottle' },
        { src: eyes, alt: 'Graphite portrait study reflected through a hand-held mirror' },
      ]} />
      <PracticeColumn id="music" kind="music" expanded={expanded} title="The musician in me" caption="Music projects, live performances, and collaborating through sound." images={[
        { src: records, alt: 'Neta listening to music among vinyl records' },
        { src: singing, alt: 'Neta singing on stage under orange and purple lights' },
        { src: bass, alt: 'Neta playing bass guitar at a live performance' },
      ]} />
      <PracticeColumn kind="fashion" expanded={expanded} title="From moodboard to garment" caption="Designing pieces from sketch to final stitch." images={[
        { src: garment, alt: 'Constructed cream dress shown from multiple angles' },
        { src: design, alt: 'Fashion illustration and technical sketches for a tailored outfit' },
        { src: moodboard, alt: 'Fall collection moodboard with earth tones, textures, and silhouettes' },
      ]} />
    </div>
  </section>;
}
