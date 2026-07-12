"use client";

import { Hero } from "@/registry/miscellaneous/hero";

export default function HeroDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Hero />
      <Hero>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <Hero.Content />
        </div>
      </Hero>
    </div>
  );
}
