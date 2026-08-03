# Neta Portfolio

A polished, responsive HCI and UI/UX design portfolio for Neta. The site is built with placeholder content so real Figma projects, screenshots, descriptions, resume details, and links can be added without restructuring the app.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local static content
- Local placeholder assets
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

## Edit Neta's Main Information

Start in `src/data/site.ts`.

Replace:

- Name and title
- School
- Location
- Short and long biography
- Email
- LinkedIn URL
- Resume PDF URL
- Availability message
- Skills and interests
- Site metadata
- Open Graph image path after replacing the social preview asset

## Add or Edit Case Studies

All projects live in `src/data/projects.ts`.

Each project supports:

- `slug`
- `title`
- `summary`
- `year`
- `role`
- `timeline`
- `team`
- `tools`
- `methods`
- `coverImage`
- `heroImage`
- `accent`
- `figmaEmbedUrl`
- `figmaPrototypeUrl`
- `sections`

To add a new case study:

1. Duplicate one project object in `src/data/projects.ts`.
2. Change the `slug` to a URL-safe value such as `student-housing-redesign`.
3. Add cover and case-study images under `public/images/projects` or `public/images/case-studies`.
4. Point `coverImage.src` and `heroImage.src` to those files.
5. Add, remove, or reorder the `sections` array.

Invalid project URLs automatically render the not-found page.

## Supported Case-Study Sections

The renderer supports:

- Full-width images
- Captioned figures
- Two-column comparisons
- Image galleries
- Quotes or insights
- Research-stat callouts
- Process timelines
- Numbered findings
- Design-decision callouts
- Embedded Figma prototypes
- Outcome summaries
- Reflection sections

Use only the sections that belong in a real case study. You do not need every section for every project.

## Add Figma Prototype Embeds

In Figma, copy the embed code for the prototype. Paste only the iframe `src` URL into:

```ts
figmaEmbedUrl: "https://embed.figma.com/proto/...",
```

Paste the normal share URL into:

```ts
figmaPrototypeUrl: "https://www.figma.com/proto/...",
```

Do not paste raw iframe HTML. The `FigmaPrototype` component creates the iframe safely.

For phone prototypes, set:

```ts
deviceType: "mobile",
aspectRatio: "9 / 19",
```

For desktop prototypes, set:

```ts
deviceType: "desktop",
aspectRatio: "16 / 10",
```

## Replace Images

Use these folders:

- Project covers: `public/images/projects`
- Case-study images: `public/images/case-studies`
- Profile image: `public/images/profile`
- Open Graph image: `public/images/og`
- Resume PDF: `public/resume`

After replacing an image, update the matching path in `src/data/site.ts` or `src/data/projects.ts`.

## Replace the Resume

1. Add the PDF at `public/resume/neta-resume.pdf`.
2. Open `src/data/site.ts`.
3. Set:

```ts
resumePdfUrl: "/resume/neta-resume.pdf",
```

The `/resume` page will then enable the view and download buttons.

## SEO and Social Preview

Edit metadata in `src/data/site.ts`:

- `metadata.title`
- `metadata.description`
- `metadata.author`
- `metadata.keywords`
- `metadata.siteUrl`
- `metadata.openGraphImage`

Replace `public/images/og/neta-og.svg` with a final social preview image before sharing widely. A 1200 x 630 PNG or JPG is best for social platforms.

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
5. Update `metadata.siteUrl` in `src/data/site.ts` to the final domain.

## Before Submitting the Portfolio Link

- Replace placeholder biography, school, email, and LinkedIn details.
- Replace all three placeholder case studies with real work.
- Paste Figma embed URLs and full prototype URLs.
- Replace local placeholder graphics with real screenshots or exported frames.
- Add the resume PDF and update `resumePdfUrl`.
- Replace the Open Graph image and favicon.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
