"use client";

import {
  Hero,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroLogos,
  HeroTitle,
} from "@/registry/miscellaneous/hero";

export default function HeroTwoLogosDemo() {
  return (
    <Hero
      data={{
        logo1: { text: "Acme" },
        logo2: { text: "mcpcn" },
        logoSeparator: "×",
        primaryButton: { label: "Get Started" },
        secondaryButton: { label: "GitHub" },
        subtitle:
          "Combining the best of both worlds to deliver exceptional user experiences.",
        title: "Acme × mcpcn",
      }}
    >
      <HeroContent>
        <HeroLogos />
        <HeroTitle />
        <HeroDescription />
        <HeroActions />
      </HeroContent>
    </Hero>
  );
}
