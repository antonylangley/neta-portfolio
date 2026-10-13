import type { Metadata } from 'next';
import { Toolkit } from '@/components/Toolkit';
import { Navigation } from '@/components/Navigation';
import { ContactFooter } from '@/components/ContactFooter';
import { AboutIntro, JourneyCard, ChildhoodOutro } from '@/components/about/AboutSections';
import { CreativePractice } from '@/components/about/CreativePractice';
import './about.css';

export const metadata: Metadata = { title: 'About — Neta Rogovsky', description: 'Product Designer and UX Researcher. A little about my journey through design, music, visual art, and fashion.' };
export default function AboutPage() {
  return <div className="about-page">
    <a className="skip-link" href="#about-main">Skip to content</a>
    <Navigation variant="landing" />
    <main className="about-main" id="about-main">
      <div className="about-first-screen">
        <AboutIntro />
        <Toolkit />
      </div>
      <JourneyCard />
      <CreativePractice />
      <ChildhoodOutro />
    </main>
    <ContactFooter variant="about" />
  </div>;
}
