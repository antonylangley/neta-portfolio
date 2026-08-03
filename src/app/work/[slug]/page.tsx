import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CaseStudyRenderer } from "@/components/CaseStudyRenderer";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { SectionLabel } from "@/components/SectionLabel";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/data/projects";
import { site } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "This case study does not exist.",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - ${site.name}`,
      description: project.summary,
      images: [
        {
          url: project.coverImage.src,
          width: 1440,
          height: 980,
          alt: project.coverImage.alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(project.slug);

  return (
    <article>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            href="/work"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to work
          </Link>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel color={project.accent}>{project.eyebrow}</SectionLabel>
              <h1 className="text-5xl font-black text-charcoal sm:text-6xl">{project.title}</h1>
              <p className="mt-6 text-xl leading-9 text-muted">{project.summary}</p>
            </div>

            <dl className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2">
              {[
                ["Role", project.role],
                ["Timeline", project.timeline],
                ["Team", project.team],
                ["Year", project.year],
                ["Tools", project.tools.join(", ")],
                ["Methods", project.methods.join(", ")],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-bold uppercase text-muted">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-10">
            <div className="selection-frame overflow-hidden rounded-lg border border-charcoal bg-white shadow-selection">
              <Image
                alt={project.heroImage.alt}
                className="h-auto w-full object-cover"
                height={980}
                priority
                src={project.heroImage.src}
                width={1440}
              />
            </div>
            {project.heroImage.caption ? (
              <figcaption className="mt-3 text-sm leading-6 text-muted">{project.heroImage.caption}</figcaption>
            ) : null}
          </figure>
        </div>
      </section>

      <section className="border-t border-line bg-canvas px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CaseStudyRenderer accent={project.accent} projectTitle={project.title} sections={project.sections} />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProjectNavigation next={adjacent.next} previous={adjacent.previous} />
        </div>
      </section>
    </article>
  );
}
