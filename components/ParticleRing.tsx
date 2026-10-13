'use client';

import { useEffect, useRef } from 'react';

// Deterministic data keeps the server fallback and hydrated view consistent.
function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}
// Blend silver, powder blue, lavender, and dusty pink seamlessly around the ring.
// Approximately 25% more linear-light luminance, with the same pastel color ratios.
const colorStops = [[203, 208, 219], [193, 219, 238], [188, 179, 235], [231, 184, 200]];
function particleColor(angle: number) {
  const turn = angle / (Math.PI * 2) + 0.325;
  const position = ((turn % 1 + 1) % 1) * colorStops.length;
  const index = Math.floor(position);
  const blend = position - index;
  return colorStops[index].map((channel, i) =>
    Math.round(channel + (colorStops[(index + 1) % colorStops.length][i] - channel) * blend)
  ).join(',');
}

const particles = Array.from({ length: 5600 }, (_, i) => ({
  phase: random(i + 1) * Math.PI * 2,
  offset: (random(i + 13) + random(i + 31) + random(i + 61) - 1.5) * 0.16,
  depth: (random(i + 79) - 0.5) * 0.16,
  size: 1.0 + random(i + 103) * 0.75,
  alpha: 0.55 + random(i + 151) * 0.45,
  speed: 0.035 + random(i + 131) * 0.025,
}));

export function ParticleRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const host = canvas.parentElement!;
    const interaction = canvas.closest<HTMLElement>('.hero') ?? host;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, lastTime = 0, elapsed = 0;
    let visible = true;
    let pointerX = 0, pointerY = 0, targetSpread = 1;
    let tiltX = 0, tiltY = 0, spread = 1;
    let reduced = media.matches;

    function draw(now: number) {
      if (!ctx || !canvas) return;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.04) : 0;
      lastTime = now;
      const moving = !reduced;
      if (moving) elapsed += delta * (1 + pointerX * 0.55);
      const ease = 1 - Math.exp(-delta * 5);
      tiltX += ((moving ? pointerX : 0) - tiltX) * ease;
      tiltY += ((moving ? pointerY : 0) - tiltY) * ease;
      spread += ((moving ? targetSpread : 1) - spread) * ease;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.275;
      const count = width < 450 ? 2800 : particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        const angle = p.phase + elapsed * p.speed;
        const r = radius * (1 + p.offset * spread);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        // Rigid rotations preserve the circular geometry; perspective supplies depth.
        const axial = p.depth * radius * spread;
        const pitch = tiltY * 0.65;
        const yaw = tiltX * 0.65;
        const roll = -0.12 + tiltX * 0.18;
        const pitchedY = y * Math.cos(pitch) - axial * Math.sin(pitch);
        const pitchedZ = y * Math.sin(pitch) + axial * Math.cos(pitch);
        const rotatedX = x * Math.cos(yaw) + pitchedZ * Math.sin(yaw);
        const z = -x * Math.sin(yaw) + pitchedZ * Math.cos(yaw);
        const perspective = 1 / (1 - z / (radius * 4));
        const px = width / 2 + (rotatedX * Math.cos(roll) - pitchedY * Math.sin(roll)) * perspective;
        const py = height / 2 + (rotatedX * Math.sin(roll) + pitchedY * Math.cos(roll)) * perspective;
        ctx.fillStyle = `rgba(${particleColor(angle)},${p.alpha})`;
        const size = p.size * Math.max(0.85, radius / 255) * perspective;
        ctx.fillRect(px, py, size, size);
      }
      canvas.dataset.ready = 'true';
    }
    function tick(now: number) {
      draw(now);
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      draw(performance.now());
      if (visible && !document.hidden && !reduced) frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      const rect = interaction.getBoundingClientRect();
      const ring = host.getBoundingClientRect();
      const centerX = ring.left + ring.width / 2;
      const centerY = ring.top + ring.height / 2;
      // The fixed header covers the top of the scene. Use the same reachable
      // distance in both directions, centered on the ring, with equal limits.
      const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
      const spanX = Math.max(1, Math.min(centerX - rect.left, rect.right - centerX));
      const spanY = Math.max(1, Math.min(centerY - Math.max(rect.top, headerBottom), rect.bottom - centerY));
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      pointerX = clamp((event.clientX - centerX) / spanX);
      pointerY = clamp((event.clientY - centerY) / spanY);
    }
    function reset() { pointerX = 0; pointerY = 0; targetSpread = 1; }
    function press(event: PointerEvent) { if (event.pointerType !== 'touch') targetSpread = 0.25; }
    function release() { targetSpread = 1; }
    function preference() { reduced = media.matches; sync(); }
    resize.observe(host);
    intersection.observe(host);
    interaction.addEventListener('pointermove', move);
    interaction.addEventListener('pointerleave', reset);
    interaction.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect();
      interaction.removeEventListener('pointermove', move);
      interaction.removeEventListener('pointerleave', reset);
      interaction.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', preference);
    };
  }, []);

  return <>
    <div className="particle-field" aria-hidden="true">
      <svg className="particle-fallback" viewBox="0 0 600 600">
        {particles.slice(0, 1200).map((p, i) => <circle key={i}
          cx={(300 + Math.cos(p.phase) * 165 * (1 + p.offset)).toFixed(3)}
          cy={(300 + Math.sin(p.phase) * 158 * (1 + p.offset)).toFixed(3)}
          r={(p.size * 0.85).toFixed(3)} fill={`rgb(${particleColor(p.phase)})`} opacity="0.7" />)}
      </svg>
      <canvas ref={canvasRef} />
    </div>

  </>;
}
