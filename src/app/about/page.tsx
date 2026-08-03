import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

const resumePath = "/resume.pdf";
const email = "nr598@njit.edu";
const linkedin = "https://www.linkedin.com/in/neta-rogovsky/";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Neta Rogovsky: HCI education, relevant coursework, skills, and contact links.",
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
            I&apos;m a Human-Computer Interaction student at NJIT focused on UI/UX design,
            product thinking, and front-end prototyping. My work combines research, interface
            structure, visual design, and implementation so digital products feel clear and usable.
          </p>
        </section>

        <section className="about-grid">
          <span>HCI Education</span>
          <div>
            <h2>B.S. Human-Computer Interaction, NJIT</h2>
            <p>
              Expected graduation 2027. My coursework has focused on user experience design,
              information design, research methods, psychology, web development, and ethical
              computing.
            </p>

            <div className="coursework-block">
              <h3>Relevant Coursework</h3>
              <ul className="coursework-list">
                <li>
                  <strong>IT 485</strong>
                  <span>Prototyping in UX</span>
                </li>
                <li>
                  <strong>IS 347</strong>
                  <span>Designing the User Experience</span>
                </li>
                <li>
                  <strong>IS 257</strong>
                  <span>Design Thinking</span>
                </li>
                <li>
                  <strong>IS 375</strong>
                  <span>Discovering User Needs for UX</span>
                </li>
                <li>
                  <strong>IS 218</strong>
                  <span>Building Web Applications</span>
                </li>
                <li>
                  <strong>IS 117</strong>
                  <span>Introduction to Web Development</span>
                </li>
                <li>
                  <strong>PSY 210</strong>
                  <span>Foundations of Cyberpsychology</span>
                </li>
                <li>
                  <strong>IT 201</strong>
                  <span>Information Design Techniques</span>
                </li>
              </ul>
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
