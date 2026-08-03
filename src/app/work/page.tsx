import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "UI/UX and HCI case-study placeholders for Neta's design portfolio, ready for real project content and Figma prototypes.",
};

export default function WorkPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel color="#2563eb">Work</SectionLabel>
        <div className="max-w-4xl">
          <h1 className="text-5xl font-black text-charcoal sm:text-6xl">Case studies</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Three clearly labeled placeholder case studies are ready for Neta&apos;s actual Figma
            projects, screenshots, research notes, prototype links, and outcomes.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
