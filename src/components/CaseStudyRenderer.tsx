import Image from "next/image";
import type { CaseStudySection, Figure } from "@/data/projects";
import { FigmaPrototype } from "@/components/FigmaPrototype";
import { SectionLabel } from "@/components/SectionLabel";

type CaseStudyRendererProps = {
  projectTitle: string;
  sections: CaseStudySection[];
  accent: string;
};

function CaptionedFigure({ figure, wide = false }: { figure: Figure; wide?: boolean }) {
  return (
    <figure className={wide ? "mx-auto max-w-6xl" : "mx-auto max-w-4xl"}>
      <div className="relative overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        {figure.label ? (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase text-muted">
            {figure.label}
          </span>
        ) : null}
        <Image
          alt={figure.alt}
          className="h-auto w-full object-cover"
          height={980}
          src={figure.src}
          width={1440}
        />
      </div>
      {figure.caption ? <figcaption className="mt-3 text-sm leading-6 text-muted">{figure.caption}</figcaption> : null}
    </figure>
  );
}

export function CaseStudyRenderer({ projectTitle, sections, accent }: CaseStudyRendererProps) {
  return (
    <div className="space-y-20">
      {sections.map((section) => {
        switch (section.type) {
          case "text":
            return (
              <section className="mx-auto max-w-3xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="text-3xl font-bold text-charcoal">{section.title}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 grid gap-3">
                    {section.bullets.map((item) => (
                      <li className="rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-charcoal" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );

          case "figure":
            return (
              <section id={section.id} key={section.id}>
                <div className="mx-auto mb-6 max-w-3xl">
                  {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                  {section.title ? <h2 className="text-3xl font-bold text-charcoal">{section.title}</h2> : null}
                </div>
                <CaptionedFigure figure={section.figure} wide={section.wide} />
              </section>
            );

          case "comparison":
            return (
              <section className="mx-auto max-w-6xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <div className="mb-6 max-w-3xl">
                  <h2 className="text-3xl font-bold text-charcoal">{section.title}</h2>
                  {section.summary ? <p className="mt-4 text-base leading-7 text-muted">{section.summary}</p> : null}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <CaptionedFigure figure={section.before} wide />
                  <CaptionedFigure figure={section.after} wide />
                </div>
              </section>
            );

          case "gallery":
            return (
              <section className="mx-auto max-w-6xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="mb-6 max-w-3xl text-3xl font-bold text-charcoal">{section.title}</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {section.figures.map((figure) => (
                    <CaptionedFigure figure={figure} key={figure.src} wide />
                  ))}
                </div>
              </section>
            );

          case "quote":
            return (
              <section className="mx-auto max-w-4xl" id={section.id} key={section.id}>
                <blockquote className="rounded-lg border-l-4 bg-white p-6 text-2xl font-semibold leading-10 text-charcoal shadow-soft" style={{ borderColor: accent }}>
                  {section.quote}
                </blockquote>
                {section.attribution ? <p className="mt-3 text-sm font-semibold text-muted">{section.attribution}</p> : null}
              </section>
            );

          case "stats":
            return (
              <section className="mx-auto max-w-6xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="mb-6 max-w-3xl text-3xl font-bold text-charcoal">{section.title}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {section.stats.map((stat) => (
                    <div className="rounded-lg border border-line bg-white p-5 shadow-soft" key={stat.label}>
                      <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
                      <p className="mt-2 text-sm font-bold text-charcoal">{stat.label}</p>
                      <p className="mt-3 text-sm leading-6 text-muted">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "timeline":
            return (
              <section className="mx-auto max-w-4xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="text-3xl font-bold text-charcoal">{section.title}</h2>
                <ol className="mt-8 grid gap-4">
                  {section.steps.map((step) => (
                    <li className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-[9rem_1fr]" key={step.title}>
                      <p className="text-sm font-bold uppercase text-muted">{step.label}</p>
                      <div>
                        <h3 className="text-lg font-bold text-charcoal">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );

          case "findings":
            return (
              <section className="mx-auto max-w-5xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="mb-6 max-w-3xl text-3xl font-bold text-charcoal">{section.title}</h2>
                <ol className="grid gap-4 md:grid-cols-3">
                  {section.findings.map((finding, index) => (
                    <li className="rounded-lg border border-line bg-white p-5 shadow-soft" key={`${finding.title}-${index}`}>
                      <p className="text-xs font-bold uppercase text-muted">Finding {index + 1}</p>
                      <h3 className="mt-3 text-lg font-bold text-charcoal">{finding.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{finding.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );

          case "decision":
            return (
              <section className="mx-auto max-w-4xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <div className="rounded-lg border border-charcoal bg-white p-6 shadow-selection">
                  <p className="text-xs font-bold uppercase text-muted">{section.title}</p>
                  <h2 className="mt-3 text-2xl font-bold text-charcoal">{section.decision}</h2>
                  <p className="mt-4 text-base leading-8 text-muted">{section.rationale}</p>
                </div>
              </section>
            );

          case "prototype":
            return (
              <section className="mx-auto max-w-6xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="mb-6 max-w-3xl text-3xl font-bold text-charcoal">{section.title}</h2>
                <FigmaPrototype
                  aspectRatio={section.aspectRatio}
                  description={section.description}
                  deviceType={section.deviceType}
                  figmaEmbedUrl={section.figmaEmbedUrl}
                  fullPrototypeUrl={section.fullPrototypeUrl}
                  height={section.height}
                  projectTitle={projectTitle}
                />
              </section>
            );

          case "outcomes":
            return (
              <section className="mx-auto max-w-5xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <h2 className="mb-6 max-w-3xl text-3xl font-bold text-charcoal">{section.title}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.items.map((item) => (
                    <div className="rounded-lg border border-line bg-white p-5 shadow-soft" key={item.title}>
                      <h3 className="text-lg font-bold text-charcoal">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "reflection":
            return (
              <section className="mx-auto max-w-4xl" id={section.id} key={section.id}>
                {section.eyebrow ? <SectionLabel color={accent}>{section.eyebrow}</SectionLabel> : null}
                <div className="rounded-lg border border-line bg-surface p-6">
                  <h2 className="text-3xl font-bold text-charcoal">{section.title}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <h3 className="mt-8 text-lg font-bold text-charcoal">What she would improve next</h3>
                  <ul className="mt-4 grid gap-3">
                    {section.next.map((item) => (
                      <li className="rounded-lg border border-line bg-white p-4 text-sm leading-6 text-muted" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
