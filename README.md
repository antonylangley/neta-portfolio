# Neta Portfolio

A polished, responsive HCI and UI/UX design portfolio for Neta Rogovsky. The current implementation ports the Claude design files from `Home.dc.html`, `About.dc.html`, and `Nav.dc.html` into a Next.js app that is ready for Vercel.

## Technology

- Next.js App Router
- TypeScript
- Plain CSS adapted from the Claude design
- Local static content
- No CMS, database, authentication, paid service, or environment variables

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```

Run these before pushing content changes.

## Edit Content

Primary content is intentionally simple:

- Home page and project list: `src/app/page.tsx`
- About page: `src/app/about/page.tsx`
- Navigation: `src/components/Nav.tsx`
- Figma iframe renderer: `src/components/FigmaPrototype.tsx`
- SHPE screenshots: `public/images/shpe`
- Visual styling: `src/app/globals.css`

## Add Figma Prototype Embeds

The home page stores the selected work array in `src/app/page.tsx`. Paste only the iframe `src` URL into `figmaEmbedUrl`, and paste the normal Figma prototype URL into `figmaPrototypeUrl`. Do not paste raw iframe HTML.

## Replace the Resume

The resume file is served from `public/resume.pdf`. Replace that file whenever Neta has a new PDF. The home page download button and about page download button both use the native `download` attribute.

## SEO and Social Preview

Edit metadata in `src/app/layout.tsx`.

## Favicon

Replace `src/app/favicon.ico` with Neta's final favicon.

## Deploy Through Vercel

1. Push the repository to `main`.
2. Go to [Vercel New Project](https://vercel.com/new).
3. Import `antonylangley/neta-portfolio`.
4. Keep the default framework setting as Next.js.
5. Use the default install command:

```bash
npm install
```

6. Use the default build command:

```bash
npm run build
```

7. Leave environment variables empty.
8. Click Deploy.

Future pushes to `main` will automatically create new Vercel deployments once the project is connected.

## Connect a Domain Later

In Vercel:

1. Open the project.
2. Go to Settings, then Domains.
3. Add the custom domain.
4. Follow Vercel's DNS instructions.
5. Update the metadata in `src/app/layout.tsx` if the final domain should be reflected in page metadata.

## Before Submitting the Portfolio Link

- Confirm the biography, school, email, and LinkedIn details are final.
- Confirm the selected-work project copy and Figma prototype URLs are final.
- Replace `public/resume.pdf` when Neta has a newer resume.
- Replace the favicon.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
