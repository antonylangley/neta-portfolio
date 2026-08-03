import { ChimeraOriginalGallery } from "@/components/ChimeraOriginalGallery";
import { FigmaPrototype } from "@/components/FigmaPrototype";
import { InspectableImageCard } from "@/components/ImageInspector";
import { Nav } from "@/components/Nav";
import Image from "next/image";
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
    title: "SHPE NJIT App",
    description:
      "Ongoing work as UI/UX designer and frontend developer on the SHPE NJIT app, which is already live on the App Store and used by about 200 members. I create design files for the existing app and design new features for future implementation.",
    imageSet: "shpe",
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
                {"imageSet" in project ? (
                  <div className="shpe-showcase">
                    <figure className="shpe-primary-frame">
                      <div className="prototype-header">
                        <span>Current app screen</span>
                        <span>App Store live</span>
                      </div>
                      <Image
                        alt="SHPE NJIT app home screen shown inside a phone mockup."
                        className="shpe-primary-image"
                        height={1644}
                        src="/images/shpe/shpe-app-home.png"
                        width={3024}
                      />
                    </figure>

                    <div className="shpe-context-panel">
                      <span className="section-kicker shpe-kicker">Before and after redesign</span>
                      <p>
                        This board shows redesigned SHPE NJIT app screens and notes across the
                        home, profile, events, ranking, settings, and feed flows. The redesign
                        clarifies navigation, separates profile editing from profile viewing,
                        rounds controls to match the app style, and adds clearer feed prompts.
                      </p>
                    </div>

                    <InspectableImageCard
                      image={{
                        alt: "Before and after SHPE NJIT app redesign board with annotated screens and design notes.",
                        height: 1400,
                        src: "/images/shpe/shpe-redesign-board-crop.png",
                        width: 1100,
                      }}
                      imageClassName="shpe-board-image"
                      initialZoom={1.65}
                      modalTitle="SHPE NJIT Redesign Board"
                      triggerAriaLabel="Open SHPE NJIT redesign board viewer"
                      triggerClassName="shpe-board-frame"
                    />
                  </div>
                ) : (
                  <>
                    <FigmaPrototype
                      aspectRatio="16 / 9.5"
                      figmaEmbedUrl={project.figmaEmbedUrl}
                      figmaPrototypeUrl={project.figmaPrototypeUrl}
                      title={project.title}
                    />

                    {project.title === "Chimera" ? (
                      <div className="chimera-showcase">
                        <div className="chimera-context-panel">
                          <span className="section-kicker shpe-kicker">
                            Original UI before redesign
                          </span>
                          <p>
                            These screenshots capture the app creator&apos;s original Chimera UI
                            before the redesign. The new prototype uses this baseline and his
                            improvement requests as the starting point, then expands the product
                            with clearer camera navigation, stronger process controls, easier
                            scrubber behavior, more intentional stats, and entirely new feature
                            flows.
                          </p>
                        </div>
                        <ChimeraOriginalGallery />
                      </div>
                    ) : null}
                  </>
                )}
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
