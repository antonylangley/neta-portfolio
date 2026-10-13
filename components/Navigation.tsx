'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

type NavigationVariant = 'default' | 'landing' | 'about';

export function Navigation({ variant = 'default' }: { variant?: NavigationVariant }) {
  const pathname = usePathname();
  const isAbout = pathname === '/about';
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = ['home', 'product', 'communities', 'connect']
      .map(id => document.getElementById(id)).filter((section): section is HTMLElement => !!section);
    let active = '';
    const update = () => {
      frame = 0;
      // Ease into a paper header as the scene starts to scroll underneath it.
      const progress = Math.min(1, Math.max(0, (window.scrollY - 16) / 140));
      headerRef.current?.style.setProperty('--header-progress', String(progress));
      headerRef.current?.setAttribute('data-solid', String(progress > 0.5));
      // Share the header's existing scroll frame; do not change scroll behavior.
      let next = pathname === '/about' ? 'about' : pathname.startsWith('/work/') ? 'product' : 'home';
      if (pathname === '/') {
        const readingLine = Math.max((headerRef.current?.getBoundingClientRect().bottom ?? 0) + 24, window.innerHeight * .33);
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= readingLine) next = section.id;
        }
        // A short footer may never reach the reading line, even at the page end.
        if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          // Both short sections can fit at the page end. Honor a Community
          // anchor there instead of immediately marking its neighboring footer.
          next = window.location.hash === '#communities' ? 'communities' : 'connect';
        }
      }
      if (next !== active) {
        active = next;
        headerRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-nav-item]').forEach(link => {
          const selected = link.dataset.navItem === active;
          link.dataset.active = String(selected);
          if (selected) link.setAttribute('aria-current', pathname === '/' ? 'location' : 'page');
          else link.removeAttribute('aria-current');
        });
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    window.addEventListener('pageshow', scroll);
    window.addEventListener('hashchange', scroll);
    const observer = new ResizeObserver(scroll);
    const main = document.querySelector('main');
    if (main) observer.observe(main);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      window.removeEventListener('pageshow', scroll);
      window.removeEventListener('hashchange', scroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  const showIndicator = variant !== 'landing';

  return <header ref={headerRef} className="site-header" data-variant={variant}>
    <nav className="navigation" aria-label="Main navigation">
      <a className={`wordmark ${styles.item}`} data-nav-item="home" href={isAbout ? "/#top" : "#top"}>Neta Rogovsky{showIndicator && <span className={styles.indicator} aria-hidden="true" />}</a>
      <a className={styles.item} data-nav-item="product" href={isAbout ? "/#product" : "#product"}>Product{showIndicator && <span className={styles.indicator} aria-hidden="true" />}</a>
      <a className={styles.item} data-nav-item="communities" href={isAbout ? "/#communities" : "#communities"}>Community{showIndicator && <span className={styles.indicator} aria-hidden="true" />}</a>
      <a className={styles.item} data-nav-item="about" href="/about" aria-current={isAbout ? "page" : undefined}>About{showIndicator && <span className={styles.indicator} aria-hidden="true" />}</a>
      <a className={`connect-link ${styles.item}`} data-nav-item="connect" href="#connect">Contact{showIndicator && <span className={styles.indicator} aria-hidden="true" />}</a>
    </nav>
  </header>;
}
