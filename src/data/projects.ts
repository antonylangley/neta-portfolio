export type DeviceType = "desktop" | "tablet" | "mobile";

export type Figure = {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
};

export type CaseStudySection =
  | {
      type: "text";
      id: string;
      eyebrow?: string;
      title: string;
      body: string[];
      bullets?: string[];
    }
  | {
      type: "figure";
      id: string;
      eyebrow?: string;
      title?: string;
      figure: Figure;
      wide?: boolean;
    }
  | {
      type: "comparison";
      id: string;
      eyebrow?: string;
      title: string;
      before: Figure;
      after: Figure;
      summary?: string;
    }
  | {
      type: "gallery";
      id: string;
      eyebrow?: string;
      title: string;
      figures: Figure[];
    }
  | {
      type: "quote";
      id: string;
      quote: string;
      attribution?: string;
    }
  | {
      type: "stats";
      id: string;
      eyebrow?: string;
      title: string;
      stats: Array<{
        value: string;
        label: string;
        description: string;
      }>;
    }
  | {
      type: "timeline";
      id: string;
      eyebrow?: string;
      title: string;
      steps: Array<{
        label: string;
        title: string;
        text: string;
      }>;
    }
  | {
      type: "findings";
      id: string;
      eyebrow?: string;
      title: string;
      findings: Array<{
        title: string;
        detail: string;
      }>;
    }
  | {
      type: "decision";
      id: string;
      eyebrow?: string;
      title: string;
      decision: string;
      rationale: string;
    }
  | {
      type: "prototype";
      id: string;
      eyebrow?: string;
      title: string;
      description?: string;
      figmaEmbedUrl: string;
      fullPrototypeUrl: string;
      deviceType: DeviceType;
      aspectRatio?: string;
      height?: number;
    }
  | {
      type: "outcomes";
      id: string;
      eyebrow?: string;
      title: string;
      items: Array<{
        title: string;
        text: string;
      }>;
    }
  | {
      type: "reflection";
      id: string;
      eyebrow?: string;
      title: string;
      body: string[];
      next: string[];
    };

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  methods: string[];
  typeOfWork: string;
  coverImage: Figure;
  heroImage: Figure;
  accent: string;
  featured: boolean;
  figmaEmbedUrl: string;
  figmaPrototypeUrl: string;
  sections: CaseStudySection[];
};

const figmaPrototypes = {
  fileFinder: {
    embedUrl:
      "https://embed.figma.com/proto/ONdzq12FCH30o8BKlLZnTB/Prof-S-File-Finder-Wireframes--Copy-?node-id=203-419&p=f&scaling=contain&content-scaling=fixed&page-id=1%3A3&embed-host=share",
    fullUrl:
      "https://www.figma.com/proto/ONdzq12FCH30o8BKlLZnTB/Prof-S-File-Finder-Wireframes--Copy-?node-id=203-419&p=f&scaling=contain&content-scaling=fixed&page-id=1%3A3",
  },
  chimeraRedesign: {
    embedUrl:
      "https://embed.figma.com/proto/dOpCs7iBdvx63y5SCiRr62/IT-485---REDESIGN--Chimera---Kirin--Copy-?node-id=2086-801&scaling=scale-down&content-scaling=fixed&page-id=14%3A22&starting-point-node-id=2101%3A1006&embed-host=share",
    fullUrl:
      "https://www.figma.com/proto/dOpCs7iBdvx63y5SCiRr62/IT-485---REDESIGN--Chimera---Kirin--Copy-?node-id=2086-801&scaling=scale-down&content-scaling=fixed&page-id=14%3A22&starting-point-node-id=2101%3A1006",
  },
  njitAdmissions: {
    embedUrl:
      "https://embed.figma.com/proto/aNuP023sTunSMUPs02gsse/IT-485-Final---NJIT-Admissions?node-id=611-5101&p=f&scaling=scale-down&content-scaling=fixed&page-id=25%3A55&starting-point-node-id=394%3A2085&embed-host=share",
    fullUrl:
      "https://www.figma.com/proto/aNuP023sTunSMUPs02gsse/IT-485-Final---NJIT-Admissions?node-id=611-5101&p=f&scaling=scale-down&content-scaling=fixed&page-id=25%3A55&starting-point-node-id=394%3A2085",
  },
};

// Replace these placeholder projects with Neta's real case studies. Keep the
// same structure, paste only Figma iframe src values into figmaEmbedUrl, and
// add or remove sections as each project needs.
export const projects: Project[] = [
  {
    slug: "mobile-product-concept",
    title: "Mobile Product Concept",
    eyebrow: "Placeholder case study 01",
    summary:
      "Placeholder mobile app project for replacing with Neta's real product, prototype, research, and visual design work.",
    year: "Replace year",
    role: "Replace with Neta's role",
    timeline: "Replace timeline",
    team: "Replace team details",
    tools: ["Figma", "Replace tool", "Replace tool"],
    methods: ["User flows", "Wireframes", "Interactive prototype"],
    typeOfWork: "Mobile product design",
    accent: "#3b82f6",
    featured: true,
    figmaEmbedUrl: figmaPrototypes.fileFinder.embedUrl,
    figmaPrototypeUrl: figmaPrototypes.fileFinder.fullUrl,
    coverImage: {
      src: "/images/projects/mobile-product-cover.svg",
      alt: "Placeholder cover for a mobile UI/UX case study.",
      label: "Mobile frame cover",
    },
    heroImage: {
      src: "/images/projects/mobile-product-cover.svg",
      alt: "Placeholder hero graphic for the mobile product case study.",
      caption:
        "Placeholder asset. Replace with a hero mockup, prototype still, or project screenshot.",
    },
    sections: [
      {
        type: "text",
        id: "context",
        eyebrow: "01 / Context",
        title: "Project context",
        body: [
          "Placeholder content: describe the product idea, class brief, client prompt, or design challenge here.",
          "Add the constraints Neta worked within, such as platform, audience, timeline, and what success meant for the project.",
        ],
      },
      {
        type: "text",
        id: "challenge",
        eyebrow: "02 / Challenge",
        title: "Problem or design challenge",
        body: [
          "Placeholder content: replace with the real user problem and why it mattered. Avoid adding unsupported metrics or outcomes.",
        ],
        bullets: [
          "Replace with a real user need or product constraint.",
          "Replace with a real interaction or accessibility challenge.",
          "Replace with a real design goal from the project.",
        ],
      },
      {
        type: "figure",
        id: "sketches",
        eyebrow: "03 / Early sketches",
        title: "Low-fidelity exploration",
        figure: {
          src: "/images/case-studies/mobile-sketches.svg",
          alt: "Placeholder sketch frames for an early mobile design direction.",
          caption:
            "Replace with Neta's sketches, early explorations, or annotated FigJam/Figma boards.",
        },
      },
      {
        type: "gallery",
        id: "wireframes",
        eyebrow: "04 / Wireframes",
        title: "Wireframes and task flow",
        figures: [
          {
            src: "/images/case-studies/mobile-wireframes.svg",
            alt: "Placeholder mobile wireframe sequence.",
            caption: "Replace with wireframes that show the core task flow.",
            label: "Wireframe pass",
          },
          {
            src: "/images/case-studies/mobile-flow.svg",
            alt: "Placeholder mobile task flow diagram.",
            caption: "Replace with a task flow or user journey diagram.",
            label: "Task flow",
          },
        ],
      },
      {
        type: "prototype",
        id: "prototype",
        eyebrow: "05 / Prototype",
        title: "Interactive Figma prototype",
        description:
          "Embedded Figma prototype for the Prof S File Finder wireframes. Replace this URL in src/data/projects.ts when the final prototype changes.",
        figmaEmbedUrl: figmaPrototypes.fileFinder.embedUrl,
        fullPrototypeUrl: figmaPrototypes.fileFinder.fullUrl,
        deviceType: "desktop",
        aspectRatio: "16 / 9",
        height: 620,
      },
      {
        type: "reflection",
        id: "reflection",
        eyebrow: "06 / Reflection",
        title: "Reflection",
        body: [
          "Placeholder content: summarize what Neta learned from this project and how the work shaped her design process.",
        ],
        next: [
          "Replace with what she would test next.",
          "Replace with what she would refine in the interaction model.",
          "Replace with what she would improve in visual or accessibility details.",
        ],
      },
    ],
  },
  {
    slug: "research-driven-redesign",
    title: "Research-Driven Redesign",
    eyebrow: "Placeholder case study 02",
    summary:
      "Placeholder redesign project for showing research synthesis, usability findings, information architecture, and iteration.",
    year: "Replace year",
    role: "Replace with Neta's role",
    timeline: "Replace timeline",
    team: "Replace team details",
    tools: ["Figma", "FigJam", "Replace tool"],
    methods: ["User interviews", "Usability testing", "Research synthesis"],
    typeOfWork: "Research and redesign",
    accent: "#f97316",
    featured: true,
    figmaEmbedUrl: figmaPrototypes.chimeraRedesign.embedUrl,
    figmaPrototypeUrl: figmaPrototypes.chimeraRedesign.fullUrl,
    coverImage: {
      src: "/images/projects/research-redesign-cover.svg",
      alt: "Placeholder cover for a research-driven redesign case study.",
      label: "Research board cover",
    },
    heroImage: {
      src: "/images/projects/research-redesign-cover.svg",
      alt: "Placeholder hero graphic for the research redesign case study.",
      caption:
        "Placeholder asset. Replace with a real redesign overview, annotated screen, or research synthesis board.",
    },
    sections: [
      {
        type: "text",
        id: "context",
        eyebrow: "01 / Context",
        title: "Why this experience needed a redesign",
        body: [
          "Placeholder content: describe the existing product or experience and why users were struggling.",
          "Add what Neta was responsible for, what research methods she used, and how the redesign was scoped.",
        ],
      },
      {
        type: "stats",
        id: "research-plan",
        eyebrow: "02 / Research",
        title: "Research plan placeholders",
        stats: [
          {
            value: "Replace",
            label: "Participants",
            description:
              "Add the real study size or remove this callout if the project did not include participant research.",
          },
          {
            value: "Replace",
            label: "Tasks tested",
            description:
              "Add the real tasks, scenarios, or usability prompts used during testing.",
          },
          {
            value: "Replace",
            label: "Key themes",
            description:
              "Add synthesized themes once Neta's real findings are available.",
          },
        ],
      },
      {
        type: "findings",
        id: "findings",
        eyebrow: "03 / Findings",
        title: "Research findings",
        findings: [
          {
            title: "Replace with real finding",
            detail:
              "Placeholder detail: explain the evidence behind this insight and how it influenced the design direction.",
          },
          {
            title: "Replace with real finding",
            detail:
              "Placeholder detail: include what users expected, where they hesitated, or what confused them.",
          },
          {
            title: "Replace with real finding",
            detail:
              "Placeholder detail: connect this finding to a design decision later in the case study.",
          },
        ],
      },
      {
        type: "comparison",
        id: "before-after",
        eyebrow: "04 / Iteration",
        title: "Before and after comparison",
        before: {
          src: "/images/case-studies/comparison-before.svg",
          alt: "Placeholder before state for the redesign.",
          caption: "Replace with the original screen or workflow.",
          label: "Before",
        },
        after: {
          src: "/images/case-studies/comparison-after.svg",
          alt: "Placeholder after state for the redesign.",
          caption: "Replace with the redesigned screen or workflow.",
          label: "After",
        },
        summary:
          "Placeholder summary: explain what changed, why it changed, and which research insight supported the decision.",
      },
      {
        type: "decision",
        id: "decision",
        eyebrow: "05 / Design decision",
        title: "Design decision callout",
        decision:
          "Placeholder decision: describe a specific interaction, layout, or content decision Neta made.",
        rationale:
          "Placeholder rationale: connect the decision to research evidence, accessibility, usability, or visual hierarchy.",
      },
      {
        type: "prototype",
        id: "prototype",
        eyebrow: "06 / Prototype",
        title: "Interactive Figma prototype",
        description:
          "Embedded Figma prototype for the Chimera/Kirin redesign. Replace this URL in src/data/projects.ts when the final prototype changes.",
        figmaEmbedUrl: figmaPrototypes.chimeraRedesign.embedUrl,
        fullPrototypeUrl: figmaPrototypes.chimeraRedesign.fullUrl,
        deviceType: "desktop",
        aspectRatio: "16 / 9",
        height: 640,
      },
      {
        type: "outcomes",
        id: "outcomes",
        eyebrow: "07 / Outcome",
        title: "Outcome summary placeholders",
        items: [
          {
            title: "Replace with real outcome",
            text: "Add real qualitative or portfolio-appropriate outcomes. Do not invent user counts, business results, or awards.",
          },
          {
            title: "Replace with what changed",
            text: "Describe the strongest interface improvement, content change, or usability clarification.",
          },
        ],
      },
    ],
  },
  {
    slug: "web-platform-service",
    title: "Web Platform or Service Experience",
    eyebrow: "Placeholder case study 03",
    summary:
      "Placeholder web platform project for presenting service flows, dashboard patterns, IA, and responsive systems thinking.",
    year: "Replace year",
    role: "Replace with Neta's role",
    timeline: "Replace timeline",
    team: "Replace team details",
    tools: ["Figma", "Design system", "Replace tool"],
    methods: ["Information architecture", "Responsive design", "Design systems"],
    typeOfWork: "Web platform design",
    accent: "#10b981",
    featured: true,
    figmaEmbedUrl: figmaPrototypes.njitAdmissions.embedUrl,
    figmaPrototypeUrl: figmaPrototypes.njitAdmissions.fullUrl,
    coverImage: {
      src: "/images/projects/platform-service-cover.svg",
      alt: "Placeholder cover for a web platform or service experience case study.",
      label: "Service frame cover",
    },
    heroImage: {
      src: "/images/projects/platform-service-cover.svg",
      alt: "Placeholder hero graphic for the web platform case study.",
      caption:
        "Placeholder asset. Replace with a real dashboard, service flow, or responsive platform mockup.",
    },
    sections: [
      {
        type: "text",
        id: "context",
        eyebrow: "01 / Context",
        title: "Service context",
        body: [
          "Placeholder content: describe the service, audience, and core workflow Neta designed.",
          "Add any platform constraints, collaboration details, and the main user tasks the project needed to support.",
        ],
      },
      {
        type: "timeline",
        id: "process",
        eyebrow: "02 / Process",
        title: "Process timeline",
        steps: [
          {
            label: "Discover",
            title: "Map the service flow",
            text: "Placeholder: replace with how Neta learned the domain, mapped user goals, or clarified requirements.",
          },
          {
            label: "Structure",
            title: "Define information architecture",
            text: "Placeholder: replace with navigation, taxonomy, or page hierarchy decisions.",
          },
          {
            label: "Prototype",
            title: "Build and test the interface",
            text: "Placeholder: replace with design iterations, feedback loops, and prototype learnings.",
          },
        ],
      },
      {
        type: "figure",
        id: "ia",
        eyebrow: "03 / IA",
        title: "Information architecture",
        figure: {
          src: "/images/case-studies/platform-flow.svg",
          alt: "Placeholder information architecture flow for a web service.",
          caption:
            "Replace with a sitemap, task flow, service blueprint, or IA diagram from the real project.",
        },
        wide: true,
      },
      {
        type: "gallery",
        id: "system",
        eyebrow: "04 / System",
        title: "Responsive components and final design",
        figures: [
          {
            src: "/images/case-studies/platform-system.svg",
            alt: "Placeholder component system for a web platform.",
            caption: "Replace with component explorations or design system notes.",
            label: "System",
          },
          {
            src: "/images/case-studies/platform-final.svg",
            alt: "Placeholder final web platform screens.",
            caption: "Replace with final desktop, tablet, or mobile screens.",
            label: "Final",
          },
        ],
      },
      {
        type: "quote",
        id: "insight",
        quote:
          "Placeholder insight quote: replace with a real user quote, research theme, or design principle from the case study.",
        attribution: "Replace with source or remove attribution",
      },
      {
        type: "prototype",
        id: "prototype",
        eyebrow: "05 / Prototype",
        title: "Interactive Figma prototype",
        description:
          "Embedded Figma prototype for the NJIT Admissions experience. Replace this URL in src/data/projects.ts when the final prototype changes.",
        figmaEmbedUrl: figmaPrototypes.njitAdmissions.embedUrl,
        fullPrototypeUrl: figmaPrototypes.njitAdmissions.fullUrl,
        deviceType: "desktop",
        aspectRatio: "16 / 9",
        height: 620,
      },
      {
        type: "reflection",
        id: "reflection",
        eyebrow: "06 / Reflection",
        title: "Reflection and next steps",
        body: [
          "Placeholder content: explain what Neta learned about service complexity, information architecture, or designing for repeated use.",
        ],
        next: [
          "Replace with what she would validate next.",
          "Replace with how she would extend the design system.",
          "Replace with any accessibility or responsiveness improvements she would prioritize.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
