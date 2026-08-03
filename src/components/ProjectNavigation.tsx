import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectNavigationProps = {
  previous: Project;
  next: Project;
};

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Case study navigation"
      className="grid gap-4 border-t border-line pt-8 md:grid-cols-2"
    >
      <Link
        className="group rounded-lg border border-line bg-white p-5 text-charcoal shadow-soft transition hover:-translate-y-0.5 hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
        href={`/work/${previous.slug}`}
      >
        <span className="inline-flex items-center gap-2 text-sm font-bold text-muted">
          <ArrowLeft aria-hidden="true" className="size-4 transition group-hover:-translate-x-1" />
          Previous project
        </span>
        <span className="mt-3 block text-xl font-bold">{previous.title}</span>
      </Link>
      <Link
        className="group rounded-lg border border-line bg-white p-5 text-charcoal shadow-soft transition hover:-translate-y-0.5 hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue md:text-right"
        href={`/work/${next.slug}`}
      >
        <span className="inline-flex items-center gap-2 text-sm font-bold text-muted md:justify-end">
          Next project
          <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
        </span>
        <span className="mt-3 block text-xl font-bold">{next.title}</span>
      </Link>
    </nav>
  );
}
