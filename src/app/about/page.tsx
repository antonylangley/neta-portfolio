import type { Metadata } from "next";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/data/site";
import { getMailtoHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Neta, an HCI student and UI/UX designer. Placeholder biography, education, skills, interests, and contact details ready for real content.",
};

export default function AboutPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel color="#e11d48">About</SectionLabel>
            <h1 className="text-5xl font-black text-charcoal sm:text-6xl">Designing with research, clarity, and care.</h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/resume" icon={FileText} variant="primary">
                Resume
              </ButtonLink>
              <ButtonLink href={getMailtoHref(site.email)} icon={Mail}>
                Email Neta
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-8 text-muted">
            {site.longBio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-bold uppercase text-muted">Education</p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal">{site.school}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Placeholder education copy: replace with HCI program details, relevant coursework,
              studio work, research labs, or academic focus areas.
            </p>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-bold uppercase text-muted">Design philosophy</p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal">Readable products come from readable thinking.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Placeholder philosophy: describe how Neta balances user research, product constraints,
              accessibility, visual hierarchy, and prototyping. Keep it specific to her real process.
            </p>
          </section>
        </div>

        <section className="mt-14">
          <SectionLabel color="#2563eb">Skills</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2">
            {site.skillGroups.map((group) => (
              <article className="rounded-lg border border-line bg-white p-6 shadow-soft" key={group.title}>
                <h2 className="text-2xl font-bold text-charcoal">{group.title}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-muted" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-line bg-surface p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-muted">Design interests</p>
              <h2 className="mt-3 text-2xl font-bold text-charcoal">Areas to personalize</h2>
            </div>
            <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
              {site.interests.map((interest) => (
                <li className="rounded-lg border border-line bg-white p-4 text-sm font-semibold text-muted" key={interest}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-14">
          <ButtonLink href="/contact" icon={ArrowRight} variant="primary">
            Contact details
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
