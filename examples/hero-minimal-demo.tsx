"use client";

import { Hero } from "@/registry/miscellaneous/hero";

export default function HeroMinimalDemo() {
  return (
    <Hero
      data={{
        primaryButton: { label: "Get Started" },
        subtitle: "A simple, clean hero without logos or extra elements.",
        title: "Welcome to the Future",
      }}
    />
  );
}
