import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/data/site";
import { getMailtoHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Neta directly by email or LinkedIn. No backend form required.",
};

export default function ContactPage() {
  const hasLinkedIn = site.linkedInUrl.trim().length > 0;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel color="#2563eb">{site.availability}</SectionLabel>
          <h1 className="text-5xl font-black text-charcoal sm:text-6xl">Contact</h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Use direct links for applications, recruiter messages, and internship conversations.
            Replace the placeholder email and LinkedIn URL in src/data/site.ts before sharing.
          </p>
        </div>

        <div className="grid gap-5">
          <article className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-bold uppercase text-muted">Email</p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal">{site.email}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              This uses a mailto link, so there is no backend form or paid service.
            </p>
            <div className="mt-5">
              <ButtonLink href={getMailtoHref(site.email)} icon={Mail} variant="primary">
                Send email
              </ButtonLink>
            </div>
          </article>

          <article className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-bold uppercase text-muted">LinkedIn</p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal">
              {hasLinkedIn ? "LinkedIn profile" : "Add LinkedIn URL"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {hasLinkedIn
                ? "Open Neta's LinkedIn profile in a new tab."
                : "Paste the final LinkedIn profile URL into linkedInUrl in src/data/site.ts."}
            </p>
            <div className="mt-5">
              {hasLinkedIn ? (
                <ButtonLink href={site.linkedInUrl} icon={ExternalLink} variant="primary">
                  Open LinkedIn
                </ButtonLink>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-dashed border-line px-4 py-2 text-sm font-semibold text-muted">
                  LinkedIn link appears after URL is added
                </span>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
