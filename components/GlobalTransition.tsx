'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './GlobalTransition.module.css';

const MINIMUM_DISPLAY_MS = 720;
const BAR_FINISH_MS = 180;
const EXIT_FADE_MS = 200;
const ROUTE_SAFETY_MS = 15000;
const FRAME_INTERVAL_MS = 80;

type FrameStyle = CSSProperties & { '--sprite-x': string; '--sprite-y': string; '--frame-shift-x': string; '--frame-shift-y': string };

const frameCentersX = [196, 193, 185, 166, 158, 155.5, 196.5, 198.5, 175.5, 188, 180.5, 156.5];

function shouldTransition(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return false;

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin || !['http:', 'https:'].includes(destination.protocol)) return false;

  return destination.pathname !== window.location.pathname;
}

export function GlobalTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const usesPageSpecificLoader = pathname === '/work/shpe';
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [complete, setComplete] = useState(false);
  const [fading, setFading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [frame, setFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const routePath = useRef(pathname);
  const startedAt = useRef(0);
  const pending = useRef(true);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  }, []);

  const finishTransition = useCallback(() => {
    if (!pending.current) return;
    pending.current = false;
    clearTimers();

    const remaining = Math.max(0, MINIMUM_DISPLAY_MS - (Date.now() - startedAt.current));
    schedule(() => {
      setComplete(true);
      schedule(() => {
        setFading(true);
        schedule(() => setVisible(false), EXIT_FADE_MS);
      }, BAR_FINISH_MS);
    }, remaining);
  }, [clearTimers, schedule]);

  const beginTransition = useCallback(() => {
    clearTimers();
    startedAt.current = Date.now();
    pending.current = true;
    setVisible(true);
    setComplete(false);
    setFading(false);
    setCycle(value => value + 1);
    schedule(finishTransition, ROUTE_SAFETY_MS);
  }, [clearTimers, finishTransition, schedule]);

  useEffect(() => {
    startedAt.current = Date.now();
    schedule(finishTransition, MINIMUM_DISPLAY_MS);
    return clearTimers;
  }, [clearTimers, finishTransition, schedule]);

  useEffect(() => {
    if (routePath.current === pathname) return;
    routePath.current = pathname;
    finishTransition();
  }, [finishTransition, pathname]);

  useEffect(() => {
    const interceptRouteLink = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || !shouldTransition(event, anchor)) return;

      const destination = new URL(anchor.href, window.location.href);
      event.preventDefault();
      event.stopPropagation();
      beginTransition();
      try {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`);
      } catch {
        finishTransition();
      }
    };

    const handleHistoryNavigation = () => {
      if (new URL(window.location.href).pathname !== routePath.current) beginTransition();
    };

    document.addEventListener('click', interceptRouteLink, true);
    window.addEventListener('popstate', handleHistoryNavigation);
    return () => {
      document.removeEventListener('click', interceptRouteLink, true);
      window.removeEventListener('popstate', handleHistoryNavigation);
    };
  }, [beginTransition, finishTransition, router]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible) return;
    const interval = window.setInterval(() => setFrame(value => (value + 1) % 12), FRAME_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, visible]);

  const spriteStyle: FrameStyle = {
    '--sprite-x': `${(frame % 6) * 20}%`,
    '--sprite-y': `${Math.floor(frame / 6) * 100}%`,
    '--frame-shift-x': `${((180 - frameCentersX[frame]) / 362) * 100}%`,
    '--frame-shift-y': frame >= 6 ? '12.4%' : '0%',
  };

  const showGlobalTransition = visible && !usesPageSpecificLoader;

  return <>
    <div className={styles.pageContent} inert={showGlobalTransition || undefined}>{children}</div>
    {showGlobalTransition && <div className={`${styles.overlay} ${fading ? styles.fading : ''}`} role="status" aria-live="polite" aria-label="Loading page">
      <div className={styles.composition}>
        <div className={styles.horseWindow} aria-hidden="true">
          <div key={cycle} className={`${styles.horseFrame} ${frame === 8 ? styles.trimLeftArtifact : ''} ${frame === 9 || frame === 10 ? styles.trimRightArtifact : ''}`} style={spriteStyle} />
        </div>
        <Image className={styles.musicStar} src="/loader/music-star.png" alt="" width={1080} height={1080} sizes="(max-width: 600px) 85px, 95px" priority />
        <div className={styles.progressTrack} aria-hidden="true">
          <div key={cycle} className={`${styles.progressFill} ${complete ? styles.complete : ''}`} />
        </div>
      </div>
    </div>}
  </>;
}
