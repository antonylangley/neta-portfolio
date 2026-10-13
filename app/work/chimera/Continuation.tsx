import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { DesignDecision, ImageShowcase, LabeledCopy, SectionHeading } from '@/components/case-study/CaseStudy';
import navigationComparison from '@/public/chimera/navigation-comparison.png';
import toolsComparison from '@/public/chimera/tools-comparison.png';
import iterations from '@/public/chimera/figma-iterations.png';
import clouds from '@/public/chimera/cloud-footer.png';
import styles from './continuation.module.css';

// Responsive windows use the original, unedited image files. The desktop
// composition stays intact; mobile presents every screen in reading order.
function ScreenWindow({ source, bounds, alt }: { source: StaticImageData; bounds: [number, number, number, number]; alt: string }) {
  const [x, y, width, height] = bounds;
  const style = {
    aspectRatio: `${width} / ${height}`,
    '--image-width': `${source.width / width * 100}%`,
    '--image-left': `${-x / width * 100}%`,
    '--image-top': `${-y / height * 100}%`,
  } as CSSProperties;
  return <div className={styles.screenWindow} style={style}><Image src={source} alt={alt} sizes={`${source.width}px`} /></div>;
}

const features = [
  { title: 'Scrubber', original: 'Scrubber', redesigns: [[82, 101, 188, 369], [278, 98, 190, 367]], before: [580, 94, 169, 362], descriptions: ['Detected Movement with camera selection, date and time controls, and Create Video.', 'Detected Movement with suggested views and footage thumbnails.'] },
  { title: 'Processes', original: 'Processes', redesigns: [[76, 505, 194, 376], [278, 503, 190, 374]], before: [580, 515, 169, 360], descriptions: ['Saved Videos with footage thumbnails, download actions, and delete actions.', 'Saved Videos with an open calendar for selecting a date.'] },
  { title: 'Storage', original: 'Stats', redesigns: [[75, 932, 191, 390], [274, 932, 193, 390]], before: [580, 936, 169, 357], descriptions: ['Manage Video Storage with a pie chart and camera storage controls.', 'Manage Video Storage with a line graph and camera storage controls.'] },
] as const;

export function ProcessDetails() {
  return <div className={styles.processDetails}>
    <div className={styles.desktopComparison}>
      <ImageShowcase src={navigationComparison} alt="Redesign first: three Chimera home screens showing camera status, task-based navigation, and camera selection. The smaller original interface appears on the right." />
    </div>
    <div className={styles.mobileComparison}>
      <h3>Redesign</h3>
      <div className={styles.homeScreens}>
        <ScreenWindow source={navigationComparison} bounds={[39, 56, 238, 483]} alt="Redesigned home screen with camera status, last updated time, and recent movement." />
        <ScreenWindow source={navigationComparison} bounds={[300, 55, 246, 484]} alt="Redesigned home screen with the task-based navigation menu open." />
        <ScreenWindow source={navigationComparison} bounds={[570, 55, 253, 484]} alt="Redesigned home screen with the camera selector open." />
      </div>
      <h3>Original Interface</h3>
      <ScreenWindow source={navigationComparison} bounds={[996, 87, 211, 460]} alt="Original home interface with dense top navigation, live video, and past images." />
    </div>
    <div className={styles.firstDecision}>
      <DesignDecision number="01" title="Simplifying the experience">
        <h4>Everything didn’t need to be visible at once.</h4>
        <p>Chimera’s original interface placed nearly every feature within the same navigation, making the experience feel dense and difficult to scan. We reorganized the mobile experience around individual tasks, keeping secondary features accessible without competing for attention.</p>
      </DesignDecision>
    </div>
    <div className={styles.secondDecision}>
      <div className={styles.toolsCopy}>
        <DesignDecision number="02" title="Making Information Intuitive">
          <h4>Complex tools became clearer, <br />more visual, and easier to act <br />on.</h4>
          <p>Across Scrubber, Processes, and Stats, we replaced technical inputs and dense information with clearer controls, visual feedback, and recognizable actions.</p>
        </DesignDecision>
        <dl className={styles.transformations}>
          <div><dt>Scrubber:</dt><dd>Technical inputs → visual footage discovery</dd></div>
          <div><dt>Processes:</dt><dd>Text-heavy status → visual processing feedback</dd></div>
          <div><dt>Storage:</dt><dd>Raw storage data → actionable storage management</dd></div>
        </dl>
      </div>
      <div className={styles.desktopComparison}>
        <ImageShowcase src={toolsComparison} sizes="(max-width: 900px) 90vw, 1100px" alt="Three rows compare larger redesigns on the left with smaller original interfaces on the right, joined by left-pointing arrows: Detected Movement versus Scrubber, Saved Videos versus Processes, and Manage Video Storage versus Stats." />
      </div>
      <div className={styles.mobileComparison}>
        {features.map(feature => <section className={styles.feature} key={feature.title} aria-label={`${feature.title} comparison`}>
          <h3>Redesign</h3><p className={styles.featureLabel}>{feature.title}</p>
          <div className={styles.redesignedScreens}>
            {feature.redesigns.map((bounds, index) => <ScreenWindow key={index} source={toolsComparison} bounds={[...bounds]} alt={feature.descriptions[index]} />)}
          </div>
          <h3>Original Interface</h3><p className={styles.featureLabel}>{feature.original}</p>
          <ScreenWindow source={toolsComparison} bounds={[...feature.before]} alt={`Original ${feature.original} interface, shown after the redesign for comparison.`} />
        </section>)}
      </div>
    </div>
  </div>;
}

export function Conclusion() {
  return <>
    <section id="conclusion" className={styles.conclusion} aria-labelledby="conclusion-title">
      <SectionHeading id="conclusion-title">We redesigned Chimera around its biggest pain points. Here&apos;s what I learned.</SectionHeading>
      <LabeledCopy label="Conclusion"><p>This project challenged us to rethink a system that already worked without stripping away the functionality that made it useful. By mapping Chimera’s existing experience and redesigning its most technical interactions, we focused on making the product easier to understand without losing the simplicity Jay valued.</p></LabeledCopy>
      <div className={styles.takeaways}>
        <DesignDecision number="01" title="Takeaway">
          <h4>Designing for someone who isn&apos;t in the room.</h4>
          <p>Chimera originally worked because Jay could explain it to its users. Redesigning it showed me the importance of creating interfaces that communicate what to do, what is happening, and what comes next on their own.</p>
        </DesignDecision>
        <DesignDecision number="02" title="Takeaway">
          <h4>Function first, then form.</h4>
          <p>Jay consistently prioritized functionality over flashy design. Working within that constraint pushed us to use visual design with purpose, focusing on hierarchy, feedback, and recognizable interactions rather than decoration.</p>
        </DesignDecision>
      </div>
      <div className={styles.researchTakeaway}>
        <h3>Design based on research</h3>
        <p>Mapping Chimera’s existing experience showed me how research can turn observations into intentional design decisions. Instead of redesigning based on what looked better, we used the friction points we uncovered to guide what we changed and why.</p>
      </div>
      <ImageShowcase className={styles.iterations} src={iterations} alt="Chimera Figma workspace showing the login, home, detected movement, calendar, storage, saved video, and camera-management designs and their component variants." priority />
      <div className={styles.closing}>
        <p>It took multiple iterations, team meetings, and feedback from Stakeholder Jay to bring Chimera’s redesign to life.</p>
        <p>Working through each round helped us better understand the product, challenge our decisions, and shape the final experience.</p>
        <p>Thanks for reading! And a huge thank you to Isa and Emis who helped bring this project together. :)</p>
      </div>
    </section>
    <div className={styles.nextProject}>
      <span>Next Project</span>
      <Link href="/#product">NJIT Admissions System Redesign</Link>
    </div>
  </>;
}

export function ChimeraFooter() {
  return <footer className={styles.footer} aria-label="Chimera footer">
    <div className={styles.footerSky} aria-hidden="true"><Image src={clouds} alt="" sizes="100vw" priority unoptimized /></div>
    <nav className={styles.footerColumns} aria-label="Chimera footer navigation">
      <Link className={styles.footerName} href="/#top">Neta Rogovsky<span aria-hidden="true" /></Link>
      <div><Link href="/#product">Product</Link><ul>
        <li><Link href="/#project-shpe">SHPE</Link></li>
        <li><a href="#top">Chimera</a></li>
        <li><button disabled title="RollTech case study coming soon">RollTech</button></li>
        <li><Link href="/work/princess">Castle Escape</Link></li>
        <li><Link href="/#community-accessibility-lab">AI Glasses</Link></li>
      </ul></div>
      <div><Link href="/#communities">Community</Link><ul>
        <li><Link href="/#community-accessibility-lab">Community-Centered<br />Accessibility &amp; Innovation Lab</Link></li>
        <li><Link href="/#community-lspace">NASA L&apos;SPACE</Link></li>
        <li><Link href="/#community-shpe">Society of Hispanic<br />Professional Engineers (SHPE)</Link></li>
        <li><Link href="/#community-school-of-rock">School of Rock</Link></li>
      </ul></div>
      <div><Link href="/about">Information</Link><ul>
        <li><a href="mailto:nr598@njit.edu">Email</a></li>
        <li><button disabled title="Résumé coming soon">Resume</button></li>
        <li><a href="https://www.linkedin.com/in/neta-rogovsky/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul></div>
    </nav>
  </footer>;
}
