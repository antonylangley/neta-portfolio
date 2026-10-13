import type { Metadata } from 'next';
import { ChimeraNavigation } from './ChimeraNavigation';
import { CompetitorColumn, DesignDecision, ImageShowcase, LabeledCopy, NumberedFindings, ProjectMetadata, SectionHeading } from '@/components/case-study/CaseStudy';
import hero from '@/public/chimera/hero.png';
import preview from '@/public/chimera/mobile-preview.png';
import original from '@/public/chimera/original-interface.png';
import mobileFlow from '@/public/chimera/mobile-flow.png';
import webFlow from '@/public/chimera/web-flow.png';
import competitors from '@/public/chimera/competitors.png';
import styles from './chimera.module.css';
import { ProcessDetails, Conclusion, ChimeraFooter } from './Continuation';

export const metadata: Metadata = {
  title: 'Chimera Home Security — Neta Rogovsky',
  description: 'Designing a clearer mobile experience for Chimera, a home security platform built around locally stored surveillance data.',
};

export default function ChimeraPage() {
  return <div className={styles.page}>
    <a className="skip-link" href="#chimera-main">Skip to content</a>
    <ChimeraNavigation />
    <main id="chimera-main" className={styles.main}>
      <header className={styles.hero}>
        <h1>Designing a mobile app for<br /><strong>Chimera Home Security</strong></h1>
        <p className={styles.intro}>I led the design thinking and prototyping for <strong>Chimera,</strong><br className={styles.desktopBreak} /> a home security platform built around locally stored surveillance data. Our redesign focused on transforming the messy desktop interface into a mobile experience for viewing live cameras, reviewing detected movement, managing saved footage and monitoring storage.</p>
        <ImageShowcase src={hero} alt="Chimera Home Security sign-in screen in a phone mockup against a blue sky with clouds" priority />
        <ProjectMetadata items={[
          { label: 'Disciplines', lines: ['Product Design', 'Design System', 'Competitive Research', 'Mobile'] },
          { label: 'With', lines: ['Isa Mabugat Rios', 'Emily Koscielniak'] },
          { label: 'Timeline', lines: ['1 month, Feb–March 2026'] },
        ]} />
      </header>

      <section id="overview" className={styles.overview} aria-labelledby="overview-title">
        <SectionHeading id="overview-title">Home surveillance can offer security without giving up control of your data.</SectionHeading>
        <LabeledCopy label="Overview"><p>Chimera began in 2021 as a home security system Jay built specifically for his parents. Unlike larger security platforms such as Ring or Eufy, Chimera was designed to keep surveillance data on the user’s own machines rather than storing it on a company’s backend servers. It was originally built for a very specific audience, so Jay could personally explain how everything worked. When others began showing interest in using Chimera for their own homes, that approach no longer scaled. Chimera needed to become something a new user could understand and navigate on their own.</p></LabeledCopy>
        <ImageShowcase className={styles.preview} src={preview} alt="Four redesigned Chimera mobile screens: home camera status, camera management, saved videos, and video storage" />
      </section>

      <section id="problem" className={styles.problem} aria-labelledby="problem-title">
        <SectionHeading id="problem-title">Chimera was built to work, but not necessarily to be learned.</SectionHeading>
        <LabeledCopy label="Problem"><p>Because Chimera was originally created for Jay’s parents, its interface did not need to guide unfamiliar users through features. Many interactions relied on technical controls, unclear labels, and dense screens that made it difficult to know what to do next. The experience was also designed primarily for desktop, creating additional challenges when translating its functionality to mobile. As Chimera gained interest beyond its original users, the interface needed to become self-explanatory. Our challenge was to preserve the functionality Jay valued while making each action clear enough that users would not need him there to explain how it worked.</p></LabeledCopy>
        <div className={styles.original}>
          <h3 className={styles.originalHeading}>The original Chimera prioritized functionality over guidance.</h3>
          <ImageShowcase className={styles.originalImage} src={original} alt="Original interface screens mark navigation overload as 1, missing process status feedback as 2, and unfamiliar scrubber controls as 3." />
          <NumberedFindings items={[
            { title: 'Navigation overload', description: 'Every feature competed for space in the top navigation.' },
            { title: 'Missing status feedback', description: 'Processes gave little indication of whether an action was running or complete.' },
            { title: 'Unfamiliar controls', description: 'The scrubber relied on technical inputs that were difficult to interpret without prior knowledge.' },
          ]} />
        </div>
      </section>

      <section id="research" className={styles.research} aria-labelledby="research-title">
        <SectionHeading id="research-title">Before redesigning, we needed to understand where the friction was coming from.</SectionHeading>
        <LabeledCopy label="Research"><p>Since we couldn’t directly interact with the existing version of Chimera, our research began by analyzing its current screens and video flows. We mapped how users moved through key features and compared our findings to uncover recurring usability issues across the experience.</p></LabeledCopy>
        <div className={styles.mapping}>
          <ImageShowcase src={mobileFlow} sizes="(max-width: 700px) calc(100vw - 48px), 940px" alt="Mobile flow: opening the app leads to live surveillance, scrolling to past images and scrubber controls, then the status tree. Friction markers 1–3 appear on these transitions and controls. The signed-out entry was not observed in walkthrough recordings." />
          <DesignDecision number="01" title="Mapping the Experience"><p>We mapped Chimera’s existing flows to understand how users accessed live cameras, past footage, video processing, and storage management. This exposed friction points where unclear controls, dense screens, and technical interactions could interrupt the experience.</p></DesignDecision>
        </div>
        <div className={styles.researchPair}>
          <ImageShowcase className={styles.webFlow} src={webFlow} alt="Web flow: motion alert, sign-in page marked 1, password decision, home dashboard marked 2, left-side navigation, and checking camera activity. The failed sign-in state was not captured in walkthrough recordings." />
          <div className={styles.competitive}>
            <DesignDecision number="02" title="Competitive Analysis">
              <p>After identifying friction in Chimera’s existing experience, we looked at established home security products to understand how they made similar features easier to navigate. Ring stood out for its clean layouts, simple navigation, and clearly presented functions, giving us a reference for how familiar interaction patterns could reduce Chimera’s learning curve.</p>
              <p className={styles.takeaway}>Our Takeaway:</p>
              <p>Chimera needed the clarity of familiar security apps while preserving the local control that made it different.</p>
            </DesignDecision>
            <div className={styles.competitors}>
              <CompetitorColumn name="Eufy" source={competitors} position="left" findings={['Local video storage', 'Multi-camera management', 'Privacy-focused controls']} />
              <CompetitorColumn name="Ring" source={competitors} position="right" findings={['Simple navigation', 'Clear live camera access', 'Easy access to recorded events']} />
            </div>
          </div>

        </div>
      </section>

      <section id="process" className={styles.process} aria-labelledby="process-title">
        <SectionHeading id="process-title">Designing a clearer Chimera</SectionHeading>
        <LabeledCopy label="Process & Solution"><p>With the main friction points identified, we moved into Figma to translate Chimera’s desktop functionality into a simpler mobile experience. We focused on reducing screen density, making actions easier to recognize, and keeping important security information within reach.</p></LabeledCopy>
        <ProcessDetails />
      </section>
      <Conclusion />
    </main>
    <ChimeraFooter />
  </div>;
}
