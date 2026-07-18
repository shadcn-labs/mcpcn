"use client";

import {
  Hero,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroTitle,
} from "@/registry/miscellaneous/hero";

export default function HeroMinimalDemo() {
  return (
    <Hero
      data={{
        primaryButton: { label: "Get Started" },
        subtitle: "A simple, clean hero without logos or extra elements.",
        title: "Welcome to the Future",
      }}
    >
      <HeroContent>
        <HeroTitle />
        <HeroDescription />
        <HeroActions />
      </HeroContent>
    </Hero>
  );
}
