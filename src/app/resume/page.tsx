import type { Metadata } from "next";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/data/site";
import { getMailtoHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Neta's resume page with clear instructions for replacing the placeholder resume PDF before deployment.",
};

export default function ResumePage() {
  const hasResume = site.resumePdfUrl.trim().length > 0;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionLabel color="#10b981">Resume</SectionLabel>
        <h1 className="text-5xl font-black text-charcoal sm:text-6xl">Resume and application links.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          Add Neta&apos;s final PDF to public/resume, then set resumePdfUrl in src/data/site.ts.
          The buttons below will automatically become working links.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <FileText aria-hidden="true" className="size-8 text-blue" />
            <h2 className="mt-5 text-2xl font-bold text-charcoal">View resume</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {hasResume
                ? "Open the resume PDF in a new tab."
                : "Resume PDF is not connected yet. This is intentional placeholder handling."}
            </p>
            <div className="mt-5">
              {hasResume ? (
                <ButtonLink href={site.resumePdfUrl} icon={ExternalLink} variant="primary">
                  View resume
                </ButtonLink>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-dashed border-line px-4 py-2 text-sm font-semibold text-muted">
                  View resume after adding PDF
                </span>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <Download aria-hidden="true" className="size-8 text-orange" />
            <h2 className="mt-5 text-2xl font-bold text-charcoal">Download resume</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {hasResume
                ? "Download the same PDF for applications or recruiter review."
                : "The download option appears automatically once resumePdfUrl points to a PDF."}
            </p>
            <div className="mt-5">
              {hasResume ? (
                <ButtonLink download href={site.resumePdfUrl} icon={Download} variant="primary">
                  Download resume
                </ButtonLink>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-dashed border-line px-4 py-2 text-sm font-semibold text-muted">
                  Download resume after adding PDF
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-lg border border-line bg-surface p-6">
          <h2 className="text-2xl font-bold text-charcoal">Replacement checklist</h2>
          <ol className="mt-5 grid gap-3 text-sm leading-6 text-muted">
            <li>1. Add the final PDF at public/resume/neta-resume.pdf.</li>
            <li>2. Set resumePdfUrl to &quot;/resume/neta-resume.pdf&quot; in src/data/site.ts.</li>
            <li>3. Rebuild before deploying or pushing content updates.</li>
          </ol>
        </section>

        <div className="mt-10">
          <ButtonLink href={getMailtoHref(site.email)} icon={Mail}>
            Email Neta
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
