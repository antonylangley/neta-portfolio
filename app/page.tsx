import { CommunitiesSection } from '@/components/CommunitiesSection';
import { ContactFooter } from '@/components/ContactFooter';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProductSection } from '@/components/ProductSection';

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation variant="landing" />
    <main id="main">
      <Hero />
      <ProductSection />
      <CommunitiesSection />
    </main>
    <ContactFooter variant="landing" />
  </>;
}
