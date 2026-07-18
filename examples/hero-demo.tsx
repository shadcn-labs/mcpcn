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

export default function HeroDemo() {
  return (
    <Hero>
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
