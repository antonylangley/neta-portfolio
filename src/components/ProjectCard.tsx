import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isWide = index % 3 === 0;

  return (
    <article
      className={`group relative grid overflow-hidden rounded-lg border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:border-charcoal hover:shadow-selection-strong ${
        isWide ? "md:grid-cols-[1.08fr_0.92fr]" : ""
      }`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="relative min-h-72 overflow-hidden border-b border-line bg-surface md:border-b-0 md:border-r">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase text-muted shadow-soft">
          {project.coverImage.label}
        </div>
        <Image
          alt={project.coverImage.alt}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          height={980}
          src={project.coverImage.src}
          width={1440}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-lg border-2 opacity-0 transition group-hover:opacity-100"
          style={{ borderColor: project.accent }}
        />
      </div>

      <div className="flex min-h-72 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase text-muted">{project.eyebrow}</p>
          <h3 className="mt-3 max-w-xl text-2xl font-bold text-charcoal">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{project.summary}</p>
        </div>

        <div className="mt-8">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-bold text-charcoal">Type</dt>
              <dd className="text-muted">{project.typeOfWork}</dd>
            </div>
            <div>
              <dt className="font-bold text-charcoal">Role</dt>
              <dd className="text-muted">{project.role}</dd>
            </div>
            <div>
              <dt className="font-bold text-charcoal">Year</dt>
              <dd className="text-muted">{project.year}</dd>
            </div>
            <div>
              <dt className="font-bold text-charcoal">Methods</dt>
              <dd className="text-muted">{project.methods.slice(0, 2).join(", ")}</dd>
            </div>
          </dl>

          <Link
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-charcoal bg-charcoal px-4 py-2 text-sm font-semibold text-canvas transition hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            href={`/work/${project.slug}`}
          >
            View case study
            <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
