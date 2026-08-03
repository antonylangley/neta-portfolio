import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { getMailtoHref } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-sm font-bold text-charcoal">{site.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {site.title}. Replace the placeholder content before submitting the portfolio link.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            href={getMailtoHref(site.email)}
          >
            <Mail aria-hidden="true" className="size-4" />
            Email
          </a>
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            href="/work"
          >
            Work
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
