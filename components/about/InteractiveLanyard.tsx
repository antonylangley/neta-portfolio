'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import card from '@/public/about/id-front.png';

function CardFallback() {
  return <div className="lanyard-fallback"><span /><Image src={card} alt="Neta Rogovsky — UX Researcher and Product Designer, HCI at NJIT" priority /></div>;
}
const Scene = dynamic(() => import('./LanyardScene'), { ssr: false, loading: CardFallback });
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <CardFallback /> : this.props.children; }
}

export function InteractiveLanyard() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ left: 0, width: 0, anchor: 0 });
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      const page = ref.current.closest<HTMLElement>('.about-page');
      const pageScale = Number.parseFloat(page ? getComputedStyle(page).zoom : '1') || 1;
      setStage({
        left: -bounds.left / pageScale,
        width: document.documentElement.clientWidth / pageScale,
        anchor: bounds.left + bounds.width / 2
      });
    };
    const resizeObserver = new ResizeObserver(measure);
    if (ref.current) resizeObserver.observe(ref.current);
    window.addEventListener('resize', measure);
    measure();
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    preference();
    let visible = true;
    let loading = Boolean(document.querySelector('[role="status"][aria-label="Loading page"]'));
    const sync = () => setActive(visible && !document.hidden && !loading);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const loaderObserver = new MutationObserver(() => {
      loading = Boolean(document.querySelector('[role="status"][aria-label="Loading page"]'));
      sync();
    });
    if (ref.current) observer.observe(ref.current);
    loaderObserver.observe(document.body, { childList: true, subtree: true });
    sync();
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', sync);
    return () => { resizeObserver.disconnect(); window.removeEventListener('resize', measure); observer.disconnect(); loaderObserver.disconnect(); media.removeEventListener('change', preference); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <div ref={ref} className="lanyard-area" role="img" aria-label="Hanging pink ID card showing Neta Rogovsky, UX Researcher and Product Designer. Drag the card to swing it.">
    <div className="lanyard-stage" style={{ left: stage.left, width: stage.width || '100%' }}>
      <CanvasBoundary><Scene active={active} reduced={reduced} anchor={stage.anchor} /></CanvasBoundary>
    </div>
  </div>;
}
