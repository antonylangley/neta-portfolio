export type NavLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

// Replace this file first. It controls personal details, navigation, metadata,
// contact links, skills, and resume behavior across the whole portfolio.
export const site = {
  name: "Neta",
  monogram: "N",
  title: "HCI & UI/UX Designer",
  school: "Replace with Neta's school",
  location: "Replace with city, state",
  email: "replace-with-neta-email@example.com",
  linkedInUrl: "",
  resumePdfUrl: "",
  availability: "Open to UI/UX internships and early-career product design roles",
  heroStatement: "HCI & UI/UX designer creating thoughtful digital experiences.",
  shortBio:
    "Neta is an HCI student and UI/UX designer creating thoughtful digital experiences through research, interaction design, and visual systems. Replace this with a concise 2-3 sentence introduction to her real background.",
  longBio: [
    "Placeholder biography: add Neta's real story here, including how she found HCI, what kinds of digital experiences she cares about, and what makes her design process distinctive.",
    "Placeholder biography: describe her approach to research, prototyping, collaboration, accessibility, and turning ambiguous user needs into clear interface decisions.",
  ],
  metadata: {
    siteUrl: "https://neta-portfolio.vercel.app",
    title: "Neta - HCI & UI/UX Designer",
    description:
      "Portfolio for Neta, an HCI student and UI/UX designer focused on research-informed interaction design, prototyping, and visual systems.",
    author: "Neta",
    keywords: [
      "Neta",
      "HCI",
      "UI/UX designer",
      "product design portfolio",
      "interaction design",
      "user research",
      "Figma",
    ],
    openGraphImage: "/images/og/neta-og.svg",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  socialLinks: [
    {
      label: "Email",
      href: "mailto:replace-with-neta-email@example.com?subject=Portfolio%20inquiry",
    },
    {
      label: "LinkedIn",
      href: "",
    },
  ] satisfies SocialLink[],
  approach: [
    {
      label: "01 / Research",
      title: "Start with context",
      text: "Placeholder copy: replace with how Neta frames user needs, constraints, and evidence before moving into interface work.",
    },
    {
      label: "02 / Interaction",
      title: "Prototype the thinking",
      text: "Placeholder copy: replace with how she explores flows, tests assumptions, and uses Figma prototypes to make ideas tangible.",
    },
    {
      label: "03 / Systems",
      title: "Make it usable at scale",
      text: "Placeholder copy: replace with her point of view on visual systems, accessibility, and clear product communication.",
    },
  ],
  skillGroups: [
    {
      title: "User Research",
      items: [
        "Interview planning",
        "Usability testing",
        "Research synthesis",
        "Journey mapping",
        "Persona development",
      ],
    },
    {
      title: "Interaction Design",
      items: [
        "Task flows",
        "Wireframing",
        "Information architecture",
        "Mobile patterns",
        "Responsive web design",
      ],
    },
    {
      title: "Visual Systems",
      items: [
        "Design systems",
        "Accessibility",
        "Visual hierarchy",
        "Figma components",
        "Prototype documentation",
      ],
    },
    {
      title: "Tools & Technical Familiarity",
      items: [
        "Figma",
        "Adobe Creative Cloud",
        "HTML/CSS basics",
        "Design handoff",
        "Front-end collaboration",
      ],
    },
  ] satisfies SkillGroup[],
  interests: [
    "Accessible product experiences",
    "Human-centered AI tools",
    "Education technology",
    "Design systems",
    "Mobile interaction patterns",
    "Research-to-design storytelling",
  ],
};
