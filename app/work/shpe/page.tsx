import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShpeNavigation } from './ShpeNavigation';
import { LabeledCopy, SectionHeading } from '@/components/case-study/CaseStudy';
import shpeSymbol from '@/public/shpe/shpe-symbol.png';
import featureShowcase from '@/public/shpe/feature-showcase.png';
import appOverview from '@/public/shpe/app-overview.png';
import originalUi from '@/public/shpe/original-ui.png';
import figmaWorkspace from '@/public/shpe/figma-workspace.png';
import redesignComparison from '@/public/shpe/redesign-comparison.png';
import contributionPhone from '@/public/shpe/contribution-phone.png';
import contributionUsers from '@/public/shpe/contribution-users.png';
import contributionPlatforms from '@/public/shpe/contribution-platforms.png';
import styles from './shpe.module.css';

export const metadata: Metadata = {
  title: 'SHPE NJIT Mobile App — Neta Rogovsky',
  description: 'Redesigning and modernizing the live SHPE NJIT mobile experience for a growing student community.',
};

const footerGroups = [
  { title: 'Product', items: [
    { label: 'SHPE', href: '#top' }, { label: 'Chimera', href: '/work/chimera' }, { label: 'RollTech' },
    { label: 'Castle Escape', href: '/work/princess' }, { label: 'AI Glasses', href: '/#community-accessibility-lab' },
  ] },
  { title: 'Community', items: [
    { label: 'Community-Centered Accessibility & Innovation Lab', href: '/#community-accessibility-lab' },
    { label: "NASA L'SPACE", href: '/#community-lspace' },
    { label: 'Society of Hispanic Professional Engineers (SHPE)', href: '/#community-shpe' },
    { label: 'School of Rock', href: '/#community-school-of-rock' },
  ] },
  { title: 'Information', items: [
    { label: 'Email', href: 'mailto:nr598@njit.edu' }, { label: 'Resume' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neta-rogovsky/', external: true },
  ] },
] as const;

// These windows cover the original 732 × 1333 graphic without editing the asset.
function ComparisonWindow({ start, end, label }: { start: number; end: number; label: string }) {
  const windowStyle = {
    aspectRatio: `732 / ${end - start}`,
    '--comparison-offset': `${-start / 1333 * 100}%`,
  } as CSSProperties;

  return <span className={styles.comparisonWindow} style={windowStyle}>
    <Image src={redesignComparison} alt={label} quality={95} sizes="(max-width: 700px) calc(100vw - 88px), (max-width: 900px) calc(100vw - 152px), 558px" unoptimized />
  </span>;
}

function ComparisonFigure({ start, end, label }: { start: number; end: number; label: string }) {
  return <figure className={styles.comparisonFigure}>
    <a href={redesignComparison.src} target="_blank" rel="noopener noreferrer" aria-label={`Open the full SHPE redesign comparison: ${label}`}>
      <span className={styles.mobileComparisonHeading} aria-hidden="true"><ComparisonWindow start={0} end={60} label="" /></span>
      <ComparisonWindow start={start} end={end} label={`Redesigned and original SHPE ${label} screens, with comparison arrows`} />
    </a>
  </figure>;
}

export default function ShpePage() {
  return <div className={styles.page}>
    <a className="skip-link" href="#shpe-main">Skip to content</a>
    <ShpeNavigation />
    <header className={styles.hero} aria-label="SHPE NJIT project introduction">
      <div className={styles.heroGlow} aria-hidden="true" />
      <Image className={styles.heroSymbol} src={shpeSymbol} alt="SHPE symbol" priority sizes="(max-width: 700px) 170px, 260px" />
    </header>

    <main id="shpe-main" className={styles.main}>
      <section className={styles.introduction} aria-labelledby="shpe-title">
        <h1 id="shpe-title">I designed the Interface of SHPE NJIT Mobile App</h1>
        <p className={styles.intro}>I joined a live mobile product with ~250 users, no existing design files, and an outdated/inconsistent interface. I reconstructed the product in Figma, established a reusable design foundation, redesigned the areas I owned, and worked with developers to get the new experience into the App Store.</p>
        <figure className={styles.featureImage}><a href={featureShowcase.src} target="_blank" rel="noopener noreferrer" aria-label="Open the SHPE mobile feature showcase at full size"><Image src={featureShowcase} alt="Six SHPE mobile app feature previews for community, events, social posts, check-in, rewards, and messaging" priority sizes="(max-width: 700px) calc(100vw - 48px), 800px" /></a></figure>
        <dl className={styles.metadata}>
          <div><dt>Disciplines</dt><dd>Product Design</dd><dd>Front-End Development</dd><dd>Design System</dd><dd>Mobile</dd></div>
          <div><dt>Team</dt><dd>2 UX/UI Front-End Developers</dd><dd>8 Full-Stack Developers</dd><dd>1 Project Manager</dd></div>
          <div><dt>Timeline</dt><dd>May 2026—Present</dd></div>
        </dl>
      </section>

      <section id="overview" className={styles.overview} aria-labelledby="overview-title">
        <SectionHeading id="overview-title">Redesigning and modernizing a live mobile experience for a growing student community.</SectionHeading>
        <LabeledCopy label="Overview">
            <p>Society of Hispanic Professional Engineers (SHPE) NJIT&apos;s mobile app is a live iOS and Android product used by roughly 250 students and alumni. I joined the team to improve an existing experience that had already been built and shipped, but lacked a centralized design foundation and consistent visual system.</p>
            <p>I began by conducting a design audit and sharing my findings with our project manager. From there, I helped rebuild the existing product in Figma, establish reusable interface patterns, and redesign major areas including Home, Events, and Settings. Throughout the process, I worked closely with developers to refine designs around implementation constraints and support the experience through development.</p>
        </LabeledCopy>
        <figure className={styles.appImage}><a href={appOverview.src} target="_blank" rel="noopener noreferrer" aria-label="Open the SHPE app overview at full size"><Image src={appOverview} alt="SHPE mobile app home screen for iOS and Android with SHPE identity graphics" sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) calc(100vw - 96px), 960px" /></a></figure>
      </section>

      <section id="problem" className={styles.caseSection} aria-labelledby="problem-title">
        <SectionHeading id="problem-title">A functional product without a unified design foundation.</SectionHeading>
        <LabeledCopy label="Problem">
            <p>When I joined the SHPE development team, the mobile app was already live and serving roughly 250 students and alumni. However, the interface lacked consistent visual patterns, and there was no centralized Figma file documenting the existing product.</p>
            <p>Without a shared design foundation, maintaining consistency across screens and planning future improvements became more challenging.</p>
          </LabeledCopy>
          <h3>The original SHPE UI</h3>
          <figure className={styles.originalUiFigure}>
            <a href={originalUi.src} target="_blank" rel="noopener noreferrer" aria-label="Open the original SHPE interface comparison at full size">
              <Image src={originalUi} alt="Original SHPE mobile interfaces for Home, Events, Profile, and Settings" quality={95} sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) calc(100vw - 96px), 960px" />
            </a>
            <figcaption>
              <ol className={styles.observations}>
                <li><strong>Unhelpful empty states</strong> — Home and Events displayed generic empty states without useful guidance or personalized information.</li>
                <li><strong>Disconnected navigation</strong> — Settings opened as an entirely separate page, interrupting the user&apos;s existing context.</li>
                <li><strong>Inconsistent interface patterns</strong> — Variations in cards, buttons, spacing, and settings controls created a fragmented visual experience.</li>
                <li><strong>Weak content hierarchy</strong> — Primary actions were overshadowed by secondary content, weakening the visual hierarchy.</li>
              </ol>
            </figcaption>
          </figure>
      </section>

      <section id="research" className={styles.caseSection} aria-labelledby="audit-title">
        <SectionHeading id="audit-title">Identifying what needed to change.</SectionHeading>
        <LabeledCopy label="UX Audit">
            <p>I documented usability issues across the existing experience and prioritized improvements based on their severity and impact on core workflows.</p>
          </LabeledCopy>
          <div className={styles.auditSteps}>
            <article>
              <svg className={styles.auditIcon} viewBox="0 0 48 48" aria-hidden="true"><circle cx="21" cy="21" r="11" /><path d="m29 29 9 9" /></svg>
              <h3>Evaluate</h3>
              <p>Review existing screens and interaction patterns.</p>
            </article>
            <article>
              <svg className={styles.auditIcon} viewBox="0 0 48 48" aria-hidden="true"><path d="M14 15h24M14 24h24M14 33h24" /><circle cx="9" cy="15" r="1.5" /><circle cx="9" cy="24" r="1.5" /><circle cx="9" cy="33" r="1.5" /></svg>
              <h3>Prioritize</h3>
              <p>Assign severity ratings to documented issues.</p>
            </article>
            <article>
              <span className={styles.figmaIcon} aria-hidden="true" />
              <h3>Redesign</h3>
              <p>Translate findings into interface improvements.</p>
            </article>
          </div>
      </section>

      <section id="process" className={styles.caseSection} aria-labelledby="process-title">
        <SectionHeading id="process-title">Building a design foundation from scratch.</SectionHeading>
        <LabeledCopy label="Process &amp; Solution">
            <p>With no centralized Figma file or established component library, I began by reconstructing the existing interface to create a shared design foundation. This allowed our design team to standardize recurring UI patterns, improve consistency across screens, and create a more reliable reference for developers.</p>
          </LabeledCopy>
          <figure className={styles.workspaceFigure}>
            <a href={figmaWorkspace.src} target="_blank" rel="noopener noreferrer" aria-label="Open the reconstructed SHPE Figma workspace at full size">
              <Image src={figmaWorkspace} alt="Figma workspace reconstructing the existing SHPE mobile product and documenting redesign notes" quality={95} sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 1100px) calc(100vw - 124px), 932px" />
            </a>
          </figure>
      </section>

      <section className={styles.redesignSection} aria-labelledby="redesign-title">
        <p className={styles.redesignEyebrow}>Redesigning the experience</p>
        <h2 id="redesign-title">From inconsistent screens to a cohesive experience.</h2>
        <p>Working within an already-launched mobile app, I redesigned the Home, Events, and Profile &amp; Settings screens while preserving the product&apos;s core functionality. My focus was on improving content hierarchy, simplifying navigation, and establishing consistent interface patterns without disrupting the existing experience.</p>
        <ol className={styles.redesignOutcomes}>
          <li><strong>Clearer content hierarchy</strong> — Prioritized events, announcements, and community updates.</li>
          <li><strong>Improved event discovery</strong> — Introduced a calendar and more structured event listings.</li>
          <li><strong>Consistent interface patterns</strong> — Unified components, navigation, and visual styling across screens.</li>
        </ol>
      </section>

      <section className={styles.comparisonSection} aria-label="SHPE interface redesign comparisons">
        <div className={styles.comparisonHeader} aria-hidden="true">
          <div className={styles.comparisonHeaderImage}><ComparisonWindow start={0} end={60} label="" /></div>
        </div>
        <div className={styles.comparisonRow}>
          <article className={styles.comparisonDescription}>
            <p className={styles.comparisonNumber}>01 | Home</p>
            <h3>Making the home screen more purposeful.</h3>
            <p>The original Home screen relied heavily on quick actions and empty states.</p>
            <p>I reorganized it around upcoming events, announcements, and community activity, creating a clearer hierarchy that gives members more relevant information at a glance.</p>
          </article>
          <ComparisonFigure start={60} end={480} label="Home" />
        </div>
        <div className={styles.comparisonRow}>
          <article className={styles.comparisonDescription}>
            <p className={styles.comparisonNumber}>02 | Events</p>
            <h3>Making event discovery easy.</h3>
            <p>The original Events screen offered limited guidance when no events were scheduled.</p>
            <p>I introduced a calendar and structured event listings to help members browse upcoming activities and find relevant event information more easily.</p>
          </article>
          <ComparisonFigure start={480} end={910} label="Events" />
        </div>
        <div className={styles.comparisonRow}>
          <article className={styles.comparisonDescription}>
            <p className={styles.comparisonNumber}>03 | Profile &amp; Settings</p>
            <h3>Creating a clearer experience.</h3>
            <p>I refined the Profile and Settings screens to improve the organization of account information, membership details, and preferences.</p>
            <p>Consistent components and clearer grouping make these areas easier to navigate and maintain.</p>
          </article>
          <ComparisonFigure start={910} end={1333} label="Profile and Settings" />
        </div>
      </section>

      <section id="conclusion" className={styles.caseSection} aria-labelledby="collaboration-title">
        <SectionHeading id="collaboration-title">Design system &amp; developer handoff</SectionHeading>
        <LabeledCopy label="Collaboration">
            <p>Beyond redesigning individual screens, I worked to establish a shared design foundation that developers could reference throughout implementation. Reusable components and consistent interface patterns helped reduce ambiguity between design and development while supporting future product updates.</p>
          </LabeledCopy>
      </section>

      <section className={styles.contributions} aria-labelledby="contributions-title">
        <h2 id="contributions-title">My contribution to an existing product</h2>
        <div className={styles.contributionGrid}>
          <article aria-label="3 redesigned areas">
            <Image src={contributionPhone} alt="" sizes="66px" />
            <strong>3</strong>
            <span className={styles.contributionLabel}>Core areas redesigned</span>
          </article>
          <article aria-label="Approximately 250 existing users">
            <Image src={contributionUsers} alt="" sizes="68px" />
            <strong>~250</strong>
            <span className={styles.contributionLabel}>Existing app users</span>
          </article>
          <article aria-label="Available for iOS and Android">
            <Image src={contributionPlatforms} alt="" sizes="64px" />
            <strong>iOS + Android</strong>
            <span className={styles.contributionLabel}>Product platforms</span>
          </article>
        </div>
      </section>

      <nav className={styles.nextProject} aria-label="Next project">
        <span>Next Project</span>
        <Link href="/work/chimera"><span className={styles.nextArrow} aria-hidden="true">⟶</span><span className={styles.nextProjectTitle}><strong>Chimera</strong> — Home Security Mobile App</span></Link>
      </nav>
    </main>

    <footer className={styles.footer} aria-label="SHPE case study footer">
      <nav className={styles.footerColumns} aria-label="SHPE footer navigation">
        <Link className={styles.footerName} href="/#top">Neta Rogovsky</Link>
        {footerGroups.map(group => <div key={group.title}>
          <Link href={group.title === 'Product' ? '/#product' : group.title === 'Community' ? '/#communities' : '/about'}>{group.title}</Link>
          <ul>{group.items.map(item => <li key={item.label}>{'href' in item
            ? <Link href={item.href} {...('external' in item && item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{item.label}</Link>
            : <button disabled title={`${item.label} coming soon`}>{item.label}</button>}</li>)}</ul>
        </div>)}
      </nav>
    </footer>
  </div>;
}
