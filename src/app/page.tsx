import { FigmaPrototype } from "@/components/FigmaPrototype";
import { Nav } from "@/components/Nav";
import Link from "next/link";

const resumePath = "/resume.pdf";
const email = "nr598@njit.edu";
const linkedin = "https://www.linkedin.com/in/neta-rogovsky/";

const projects = [
  {
    title: "RollTech",
    description:
      "A custom internal tool built for NJIT Admissions, the stakeholder team behind this project, helping staff manage tasks, schedules, and team communication in one dashboard.",
    figmaEmbedUrl:
      "https://embed.figma.com/proto/aNuP023sTunSMUPs02gsse/IT-485-Final---NJIT-Admissions?node-id=611-5101&p=f&scaling=scale-down&content-scaling=fixed&page-id=25%3A55&starting-point-node-id=394%3A2085&embed-host=share",
    figmaPrototypeUrl:
      "https://www.figma.com/proto/aNuP023sTunSMUPs02gsse/IT-485-Final---NJIT-Admissions?node-id=611-5101&p=f&scaling=scale-down&content-scaling=fixed&page-id=25%3A55&starting-point-node-id=394%3A2085",
  },
  {
    title: "Chimera",
    description:
      "A UI redesign for a stakeholder's existing app connected to his home security camera system. My team rebuilt the interface around his suggestions and vision for the app's next version.",
    figmaEmbedUrl:
      "https://embed.figma.com/proto/dOpCs7iBdvx63y5SCiRr62/IT-485---REDESIGN--Chimera---Kirin--Copy-?node-id=2086-801&scaling=scale-down&content-scaling=fixed&page-id=14%3A22&starting-point-node-id=2101%3A1006&embed-host=share",
    figmaPrototypeUrl:
      "https://www.figma.com/proto/dOpCs7iBdvx63y5SCiRr62/IT-485---REDESIGN--Chimera---Kirin--Copy-?node-id=2086-801&scaling=scale-down&content-scaling=fixed&page-id=14%3A22&starting-point-node-id=2101%3A1006",
  },
  {
    title: "File Finder",
    description:
      "A tool built at a professor's request to help him locate files across different classes and semesters, including tests, grades, assignments, and student work, all from one place.",
    figmaEmbedUrl:
      "https://embed.figma.com/proto/ONdzq12FCH30o8BKlLZnTB/Prof-S-File-Finder-Wireframes--Copy-?node-id=203-419&p=f&scaling=contain&content-scaling=fixed&page-id=1%3A3&embed-host=share",
    figmaPrototypeUrl:
      "https://www.figma.com/proto/ONdzq12FCH30o8BKlLZnTB/Prof-S-File-Finder-Wireframes--Copy-?node-id=203-419&p=f&scaling=contain&content-scaling=fixed&page-id=1%3A3",
  },
  {
    title: "SHPE App",
    description:
      "Ongoing work as UI/UX designer and frontend developer on the SHPE app, creating design files for the existing app and designing new features for future implementation in Figma.",
    figmaEmbedUrl:
      "https://embed.figma.com/proto/MfZ4cRgvESwpW8MVMkIGzb/SHPE-App-2026?node-id=43-2&starting-point-node-id=43%3A2&embed-host=share",
    figmaPrototypeUrl:
      "https://www.figma.com/proto/MfZ4cRgvESwpW8MVMkIGzb/SHPE-App-2026?node-id=43-2&starting-point-node-id=43%3A2",
  },
];

export default function Home() {
  return (
    <>
      <Nav activePage="home" />
      <main className="site-shell home-main" id="main-content">
        <section aria-label="Introduction" className="hero-section">
          <div className="home-hero-cols">
            <div>
              <h1>Neta Rogovsky</h1>
              <p className="hero-copy">
                I&apos;m an HCI student and UI/UX designer creating thoughtful digital experiences
                through research, interaction design, and visual systems.
              </p>
              <div className="button-row">
                <a
                  className="button button-primary"
                  download="Neta-Rogovsky-Resume.pdf"
                  href={resumePath}
                >
                  Download resume
                </a>
                <a className="button button-secondary" href={`mailto:${email}`}>
                  Get in touch
                </a>
              </div>
            </div>

            <div className="info-panel" aria-label="Profile details">
              <div>
                <span>Title</span>
                <br />
                HCI & UI/UX Designer
              </div>
              <div>
                <span>School</span>
                <br />
                NJIT
              </div>
              <div>
                <span>Location</span>
                <br />
                Newark, NJ
              </div>
              <div>
                <span>Contact</span>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div>
                <a href={linkedin} rel="noopener noreferrer" target="_blank">
                  LinkedIn -&gt;
                </a>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Selected work" className="work-section" id="work">
          <span className="section-kicker">Selected Work</span>

          <div className="project-stack">
            {projects.map((project) => (
              <article className="project-block" key={project.title}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <FigmaPrototype
                  aspectRatio="16 / 9.5"
                  figmaEmbedUrl={project.figmaEmbedUrl}
                  figmaPrototypeUrl={project.figmaPrototypeUrl}
                  title={project.title}
                />
              </article>
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <span>(c) 2026 Neta Rogovsky.</span>
          <div>
            <Link href="/#work">Work</Link>
            <Link href="/about">About</Link>
            <a href={`mailto:${email}`}>Contact</a>
          </div>
        </footer>
      </main>
    </>
  );
}
