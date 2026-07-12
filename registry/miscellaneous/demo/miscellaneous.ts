// Demo data for Miscellaneous category components
// This file contains sample data used for component previews and documentation

export const demoStats = [
  { change: 12.5, label: "Revenue", value: "$12,345" },
  { change: -3.2, label: "Orders", value: "1,234" },
  { change: 8.1, label: "Customers", value: "567" },
];

export const demoHeroDefault = {
  logo1: { alt: "Acme", text: "Acme" },
  primaryButton: { label: "Get Started" },
  secondaryButton: { label: "GitHub" },
  subtitle:
    "Create beautiful chat experiences with our comprehensive component library designed for agentic applications.",
  title: "Build beautiful chat experiences with Manifest UI",
};

export const demoHeroTwoLogos = {
  logo1: { text: "Acme" },
  logo2: {
    alt: "Manifest",
    url: "/logo-manifest-ui.svg",
    urlLight: "/logo-manifest-ui-light.svg",
  },
  logoSeparator: "x",
  primaryButton: { label: "Get Started" },
  secondaryButton: { label: "GitHub" },
  subtitle:
    "Combining the best of both worlds to deliver exceptional user experiences.",
  title: "Acme x Manifest UI",
};

export const demoHeroWithTechLogos = {
  logo1: { text: "Acme" },
  primaryButton: { label: "Get Started" },
  secondaryButton: { label: "GitHub" },
  subtitle:
    "Create beautiful experiences with our comprehensive platform designed for modern applications.",
  techLogos: [
    {
      alt: "Next.js",
      name: "Next.js",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      alt: "TypeScript",
      name: "TypeScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      alt: "React",
      name: "React",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      alt: "Tailwind CSS",
      name: "Tailwind CSS",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      alt: "Manifest",
      name: "Manifest",
      url: "https://ui.manifest.build/demo/os-tech-mnfst.svg",
    },
  ],
  techLogosLabel: "Built with open-source technologies",
  title: "Build your next project with Acme",
};

export const demoHeroMinimal = {
  logo1: undefined,
  primaryButton: { label: "Get Started" },
  secondaryButton: undefined,
  subtitle: "A simple, clean hero without logos or extra elements.",
  title: "Welcome to the Future",
};
