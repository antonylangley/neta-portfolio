# Neta Rogovsky — portfolio first draft

Next.js App Router, React, TypeScript, and plain responsive CSS. The homepage hero, beginning of Product, and contact footer are implemented.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production checks: `npm run lint`, `npm run typecheck`, `npm run build`. Run production with `npm start`. Vercel can use its standard Next.js preset; no deployment or account configuration was created.

## Structure

- `app/page.tsx`: homepage and minimal next-section placeholder.
- `app/layout.tsx`: accessible document shell and metadata.
- `app/globals.css`: composition, responsive breakpoints, focus and reduced-motion styles.
- `components/Hero.tsx`: hero, navigation, editorial statement, location information.
- `components/ParticleRing.tsx`: isolated animation and static SVG fallback.
- `public/starfield.svg`: original procedural background; no stock imagery.

The workspace initially contained only read-only project instructions and an empty `sources/` folder. The reference image was recovered from the linked chat. No separate background/font assets were available. Original references and instructions remain unchanged.

## Particle implementation

Inspired specifically by the central object at https://motion.dev/examples/js-vgpu-uniforms: a circular field with depth projection, pointer-controlled speed and tilt, and press-to-tighten spread. The full hero receives pointer input, with amplified tilt and translation. This first pass uses Canvas 2D rather than requiring WebGPU or additional animation packages. It renders 5,600 points (2,800 on small screens), caps device-pixel ratio at 1.75, smooths pointer input, and stops its animation loop offscreen, in hidden tabs , or with reduced motion enabled. Touch scrolling is never intercepted. The decorative canvas is hidden from assistive technology; the headline remains semantic HTML. A server-rendered static SVG particle ring remains when JavaScript or canvas is unavailable. SVG coordinates are rounded for consistent hydration across JS engines.

## Next design pass

Replace the procedural background with the original source asset if supplied; refine typography with the intended font; add real selected projects and Community/About destinations. Community is visibly reserved text rather than a dead link. Product links to the placeholder and About links to the supplied biography lines. No case studies, CMS, invented projects, or toolkit icons have been added. The contact footer links to the supplied email and LinkedIn; résumé is disabled pending upload. Background stars drift and twinkle, respecting reduced motion. A future GPU renderer can replace ParticleRing without changing the page layout.

## Verification

Build, lint and TypeScript checks were run. Browser review covered desktop (1440px), tablet (768px), mobile (390px), narrow mobile (320px), document overflow, canvas initialization, and contact/top navigation. Reduced-motion and no-canvas behavior are implemented as explicit code paths; OS-level reduced-motion emulation was not available in the browser testing tool.
