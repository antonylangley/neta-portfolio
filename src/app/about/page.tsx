import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

const resumePath = "/resume.pdf";
const email = "nr598@njit.edu";
const linkedin = "https://www.linkedin.com/in/neta-rogovsky/";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Neta Rogovsky: HCI education, design philosophy, skills, and contact links.",
};

export default function AboutPage() {
  return (
    <>
      <Nav activePage="about" />
      <main className="site-shell about-main" id="main-content">
        <section className="about-hero">
          <span className="section-kicker">About</span>
          <h1>A closer look at how I work.</h1>
        </section>

        <section className="about-grid">
          <span>Biography</span>
          <p>
            I&apos;m a Human-Computer Interaction student and UI/UX designer focused on making
            digital products feel clear, considerate, and human. My work moves between structured
            research and detailed visual craft. I&apos;m equally comfortable synthesizing interview
            notes and refining a component&apos;s spacing.
          </p>
        </section>

        <section className="about-grid">
          <span>HCI Education</span>
          <div>
            <h2>B.S. Human-Computer Interaction, NJIT</h2>
            <p>
              Coursework in interaction design, cognitive psychology, research methods, and
              front-end prototyping. Expected graduation 2027.
            </p>
          </div>
        </section>

        <section className="about-grid">
          <span>Design Philosophy</span>
          <p>
            Good design is legible before it is clever. I start from constraints and evidence,
            sketch broadly, and narrow through testing rather than intuition alone, aiming for
            interfaces that disappear into the task at hand.
          </p>
        </section>

        <section className="about-grid">
          <span>Interests</span>
          <div className="interest-stack">
            <div>
              <strong>Design</strong>
              <p>Design systems, information-dense interfaces, and accessible interaction patterns.</p>
            </div>
            <div>
              <strong>Research</strong>
              <p>Mixed-methods research, cognitive load in navigation, and inclusive design practices.</p>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <span className="section-kicker">Skills & Tools</span>
          <div className="skills-grid">
            <div>
              <h2>Research</h2>
              <ul>
                <li>User interviews</li>
                <li>Surveys</li>
                <li>Usability testing</li>
                <li>Competitive analysis</li>
                <li>Journey mapping</li>
              </ul>
            </div>
            <div>
              <h2>Design</h2>
              <ul>
                <li>Interaction design</li>
                <li>Wireframing</li>
                <li>Prototyping</li>
                <li>Information architecture</li>
                <li>Visual design</li>
                <li>Design systems</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div>
              <h2>Tools</h2>
              <ul>
                <li>Figma & FigJam</li>
                <li>Adobe Creative Suite</li>
                <li>Rapid prototyping tools</li>
                <li>HTML / CSS basics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-grid">
          <span>Beyond design</span>
          <p>Sketchbooks, film photography, and long walks that turn into new project ideas.</p>
        </section>

        <section className="resume-contact">
          <span className="section-kicker">Resume & Contact</span>
          <div className="button-row">
            <a className="button button-primary" href={resumePath} rel="noopener noreferrer" target="_blank">
              View resume
            </a>
            <a
              className="button button-secondary"
              download="Neta-Rogovsky-Resume.pdf"
              href={resumePath}
            >
              Download PDF
            </a>
            <a className="button button-secondary" href={linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn -&gt;
            </a>
            <a className="button button-secondary" href={`mailto:${email}`}>
              Email
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <span>(c) 2026 Neta Rogovsky.</span>
          <div>
            <Link href="/#work">Work</Link>
            <Link href="/">Home</Link>
            <a href={`mailto:${email}`}>Contact</a>
          </div>
        </footer>
      </main>
    </>
  );
}
