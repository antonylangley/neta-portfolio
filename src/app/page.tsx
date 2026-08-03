import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, GraduationCap, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { getMailtoHref } from "@/lib/links";

export default function Home() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionLabel color="#2563eb">{site.availability}</SectionLabel>
            <p className="text-sm font-bold uppercase text-muted">{site.title}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
              {site.heroStatement}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{site.shortBio}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/work" icon={ArrowRight} variant="primary">
                View selected work
              </ButtonLink>
              <ButtonLink href={getMailtoHref(site.email)} icon={Mail}>
                Contact Neta
              </ButtonLink>
              <ButtonLink href="/resume" icon={FileText} variant="quiet">
                Resume
              </ButtonLink>
            </div>

            <dl className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
                <dt className="flex items-center gap-2 font-bold text-charcoal">
                  <GraduationCap aria-hidden="true" className="size-4 text-blue" />
                  School
                </dt>
                <dd className="mt-2 text-muted">{site.school}</dd>
              </div>
              <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
                <dt className="flex items-center gap-2 font-bold text-charcoal">
                  <MapPin aria-hidden="true" className="size-4 text-green" />
                  Location
                </dt>
                <dd className="mt-2 text-muted">{site.location}</dd>
              </div>
              <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
                <dt className="font-bold text-charcoal">Focus</dt>
                <dd className="mt-2 text-muted">Research, prototyping, visual systems</dd>
              </div>
            </dl>
          </div>

          <div className="selection-frame canvas-grid rounded-lg border border-charcoal bg-surface p-4 shadow-selection">
            <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase text-muted">
              <span>Frame / Portfolio cover</span>
              <span>Replace image</span>
            </div>
            <Image
              alt="Placeholder portrait and design canvas for Neta's portfolio."
              className="h-auto w-full rounded-lg border border-line bg-white"
              height={980}
              priority
              src="/images/profile/profile-placeholder.svg"
              width={1120}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface px-4 py-16 sm:px-6 lg:px-8" id="work">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel color="#f97316">Selected work</SectionLabel>
              <h2 className="max-w-3xl text-4xl font-black text-charcoal">Case studies ready for real project content.</h2>
            </div>
            <Link
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
              href="/work"
            >
              See all work
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel color="#10b981">Design approach</SectionLabel>
          <div className="grid gap-6 md:grid-cols-3">
            {site.approach.map((item) => (
              <article className="rounded-lg border border-line bg-white p-6 shadow-soft" key={item.label}>
                <p className="text-xs font-bold uppercase text-muted">{item.label}</p>
                <h3 className="mt-4 text-2xl font-bold text-charcoal">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <SectionLabel color="#e11d48">About preview</SectionLabel>
            <h2 className="text-4xl font-black text-charcoal">A portfolio built around process, not just polished screens.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted">{site.longBio[0]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/about" icon={ArrowRight} variant="primary">
                Read about Neta
              </ButtonLink>
              <ButtonLink href={getMailtoHref(site.email)} icon={Mail}>
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
