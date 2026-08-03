import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-line bg-white p-8 shadow-soft">
        <p className="text-xs font-bold uppercase text-muted">404 / Missing frame</p>
        <h1 className="mt-4 text-4xl font-black text-charcoal">This page is not part of the portfolio.</h1>
        <p className="mt-5 text-base leading-7 text-muted">
          The route does not exist. Invalid case-study slugs are configured to show this page.
        </p>
        <Link
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-charcoal bg-charcoal px-4 py-2 text-sm font-semibold text-canvas focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
          href="/work"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to work
        </Link>
      </div>
    </section>
  );
}
