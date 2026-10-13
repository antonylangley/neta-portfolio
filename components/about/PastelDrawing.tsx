'use client';

import { useEffect, useRef } from 'react';
import styles from './PastelDrawing.module.css';

type Point = { x: number; y: number; time: number };
type Pigment = Point & { size: number; angle: number };
const HOLD_MS = 3000;
const FADE_MS = 5000;
const CONTROL = 'a, button, input, textarea, select, [role="button"], [contenteditable="true"]';

export function PastelDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const panel = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !cursor || !panel || !context) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let previous: Point | null = null;
    let activePointer: number | null = null;
    let width = 0, height = 0;
    let marks: Pigment[] = [];
    let frame: number | null = null;

    // A reusable pigment stamp: sparse grain, uneven edges, translucent wax.
    const stamp = document.createElement('canvas');
    stamp.width = stamp.height = 48;
    const brush = stamp.getContext('2d')!;
    let seed = 37;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 950; i++) {
      const x = random() * 48, y = random() * 48;
      const radius = Math.hypot((x - 24) / 23, (y - 24) / 19);
      if (radius > 0.82 + random() * 0.18 || random() < 0.18) continue;
      brush.fillStyle = `rgba(253,212,151,${0.08 + random() * 0.23})`;
      brush.fillRect(x, y, 0.4 + random() * 1.4, 0.4 + random() * 1.1);
    }
    // Keep each stamp's texture variation stable as its individual lifetime advances.
    const render = (now: number) => {
      frame = null;
      context.clearRect(0, 0, width, height);
      marks = marks.filter(mark => now - mark.time < HOLD_MS + FADE_MS);
      for (const mark of marks) {
        const progress = Math.max(0, Math.min(1, (now - mark.time - HOLD_MS) / FADE_MS));
        context.save();
        // Smoothstep gives the fade a gentle start and a soft finish.
        context.globalAlpha = 1 - progress * progress * (3 - 2 * progress);
        context.translate(mark.x, mark.y);
        context.rotate(mark.angle);
        context.drawImage(stamp, -mark.size / 2, -mark.size / 2, mark.size, mark.size);
        context.restore();
      }
      if (marks.length) frame = requestAnimationFrame(render);
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(render); };
    const stop = () => { previous = null; activePointer = null; };
    const hide = () => { stop(); cursor.hidden = true; panel.removeAttribute('data-pastel'); };
    const position = (event: PointerEvent): Point => {
      const rect = panel.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top, time: event.timeStamp };
    };
    const allowed = (event: PointerEvent) => fine.matches && event.pointerType === 'mouse';
    const show = (point: Point) => {
      cursor.hidden = false;
      panel.setAttribute('data-pastel', 'true');
      cursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
    };
    const line = (from: Point, to: Point) => {
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      if (distance < 0.1) return;
      const steps = Math.ceil(distance / 1.6);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const size = 15 + random() * 4;
        marks.push({
          x: from.x + (to.x - from.x) * t,
          y: from.y + (to.y - from.y) * t,
          time: from.time + (to.time - from.time) * t,
          size,
          angle: (random() - .5) * .35,
        });
      }
      schedule();
    };
    const enter = (event: PointerEvent) => { if (allowed(event)) show(position(event)); };
    const down = (event: PointerEvent) => {
      if (!allowed(event) || event.button !== 0 || (event.target as Element).closest(CONTROL)) return;
      event.preventDefault();
      previous = position(event);
      activePointer = event.pointerId;
      show(previous);
    };
    const move = (event: PointerEvent) => {
      if (!allowed(event)) { hide(); return; }
      const point = position(event);
      show(point);
      if (!(event.buttons & 1)) { stop(); return; }
      if (!previous || activePointer !== event.pointerId) return;
      if ((event.target as Element).closest(CONTROL)) { stop(); return; }
      const samples = event.getCoalescedEvents?.() || [];
      for (const sample of samples.length ? samples : [event]) {
        const next = position(sample);
        line(previous, next);
        previous = next;
      }
    };
    const resize = new ResizeObserver(() => {
      stop();
      const nextWidth = panel.clientWidth, nextHeight = panel.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      if (width === nextWidth && height === nextHeight && canvas.width === Math.round(nextWidth * dpr)) return;
      if (width && height) {
        for (const mark of marks) {
          mark.x *= nextWidth / width;
          mark.y *= nextHeight / height;
        }
      }
      canvas.width = Math.round(nextWidth * dpr); canvas.height = Math.round(nextHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      width = nextWidth; height = nextHeight;
      if (marks.length) schedule();
    });
    resize.observe(panel);
    panel.addEventListener('pointerenter', enter);
    panel.addEventListener('pointerdown', down);
    panel.addEventListener('pointermove', move);
    panel.addEventListener('pointerleave', hide);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('visibilitychange', hide);
    fine.addEventListener('change', hide);
    return () => {
      hide(); resize.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      marks = [];
      panel.removeEventListener('pointerenter', enter);
      panel.removeEventListener('pointerdown', down);
      panel.removeEventListener('pointermove', move);
      panel.removeEventListener('pointerleave', hide);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', hide);
      document.removeEventListener('visibilitychange', hide);
      fine.removeEventListener('change', hide);
    };
  }, []);

  return <>
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    <div ref={cursorRef} className={styles.cursor} hidden aria-hidden="true">
      <svg width="46" height="52" viewBox="0 0 46 52">
        <g transform="rotate(32 4 46)">
          <path d="M-3 8L0 4L10 5L12 9L11 42L5 47L-2 43Z" fill="#FDD497" />
          <path d="M0 10L2 7L4 8L3 41L0 43Z" fill="#fff0cd" opacity=".55" />
          <path d="M8 10L10 9L9 40L6 45" fill="none" stroke="#bd945f" strokeWidth="1.2" opacity=".45" />
          <path d="M-2 18L11 19M-2 34L11 35" stroke="#c19b6d" strokeWidth=".6" opacity=".6" />
          <path d="M1 22L7 23M1 25L8 26M1 29L6 30" stroke="#b18b5d" strokeWidth=".65" opacity=".45" />
        </g>
      </svg>
    </div>
  </>;
}
