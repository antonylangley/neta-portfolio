import Image from 'next/image';
import { PastelDrawing } from './PastelDrawing';
import { InteractiveLanyard } from './InteractiveLanyard';
import postcard from '@/public/about/postcard.png';
import childhood from '@/public/about/childhood-scrapbook.png';
import brush from '@/public/about/brush-stroke.png';

export function AboutIntro() {
  return <section className="about-intro" aria-labelledby="about-title">
    <div className="about-intro-copy">
      <h1 id="about-title">I’m Neta, a <span>New York City</span> Based<br /><em>Product Designer &amp; UX Researcher</em></h1>
      <div className="about-bio">
        <p>There are two things that feed my drive:</p>
        <p className="drive-line">I love to <em>build</em> and to <em>learn.</em></p>
        <p>Which led me to study <em>Human-Computer Interaction</em> at NJIT. My craft sits somewhere between the technical and the creative. I’ve worked across product design, accessibility research, and emerging technology.</p>
        <p>I care about understanding how people think, translating messy systems into seamless experiences, and making products that feel intentional down to the smallest interaction.</p>
      </div>
    </div>
    <InteractiveLanyard />
  </section>;
}

export function JourneyCard() {
  return <section className="journey-postcard" aria-label="A postcard about Neta's creative journey">
    <Image src={postcard} alt="A pink New York postcard describing Neta's path from music, visual art, and fashion design to product design" sizes="(max-width: 700px) 94vw, 1050px" />
  </section>;
}

export function ChildhoodOutro() {
  return <section className="childhood-outro" id="connect" aria-labelledby="childhood-title">
    <Image className="brush-stroke" src={brush} alt="" aria-hidden="true" sizes="(max-width: 700px) 60vw, 440px" />
    <PastelDrawing />
    <div className="childhood-copy">
      <h2 id="childhood-title">Still the same person,<br />always <span>crafting,</span><br /><span>creating,</span> and<br /><span>thinking</span> outside the box</h2>
    </div>
    <Image loading="eager" className="childhood-photo" src={childhood} alt="Neta at age six with her Robot Friends, built from discarded materials collected around the house. March, 2012." sizes="(max-width: 700px) 80vw, (max-width: 1800px) 40vw, 700px" />
  </section>;
}
