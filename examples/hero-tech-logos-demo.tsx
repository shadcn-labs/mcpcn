"use client";

import {
  Hero,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroLogos,
  HeroTechLogos,
  HeroTitle,
} from "@/registry/miscellaneous/hero";

export default function HeroTechLogosDemo() {
  return (
    <Hero
      data={{
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
        ],
        techLogosLabel: "Built with open-source technologies",
        title: "Build your next project with Acme",
      }}
    >
      <HeroContent>
        <HeroLogos />
        <HeroTitle />
        <HeroDescription />
        <HeroActions />
        <HeroTechLogos />
      </HeroContent>
    </Hero>
  );
}
