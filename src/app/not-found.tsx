import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell about-main" id="main-content">
      <section className="about-hero">
        <span className="section-kicker">404</span>
        <h1>This page does not exist.</h1>
        <p className="hero-copy">
          The portfolio has two main pages: home and about. Head back home to view Neta&apos;s
          selected work and Figma prototypes.
        </p>
        <Link className="button button-primary" href="/">
          Back home
        </Link>
      </section>
    </main>
  );
}
