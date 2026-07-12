import Link from "next/link";
import type { ReactNode } from "react";

import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { EventCard } from "@/registry/events/event-card";
import { MessageBubble } from "@/registry/messaging/message-bubble";
import { StatCard } from "@/registry/miscellaneous/stat-card";
import { OrderConfirm } from "@/registry/payment/order-confirm";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

const ComponentDemo = ({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href: string;
  title: string;
}) => (
  <article className="space-y-3">
    <Link
      className="inline-flex font-medium underline-offset-4 hover:underline"
      href={href}
    >
      {title}
    </Link>
    <div className="flex min-h-64 items-center rounded-xl border bg-background p-4 sm:p-6">
      <div className="w-full">{children}</div>
    </div>
  </article>
);

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <h1 className="max-w-7xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl from-foreground via-foreground to-foreground/65 bg-linear-to-b bg-clip-text text-transparent">
              mcpcn
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Composition-first compound components for polished MCP Apps.
              Install the defaults, then reshape every slot with ordinary JSX.
            </p>

            <CommandBox className="mt-4 w-full max-w-xl" />

            <HomeCtas className="mt-4" />
          </div>
        </section>

        <section className="container-wrapper pb-12 lg:pb-20">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Components for MCP Apps
              </h2>
              <p className="mt-2 text-muted-foreground">
                Install polished defaults, then compose them around your app.
              </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-2">
              <ComponentDemo
                href="/docs/blocks/events/event-card"
                title="Event Card"
              >
                <EventCard />
              </ComponentDemo>
              <ComponentDemo
                href="/docs/blocks/payment/order-confirm"
                title="Order Confirm"
              >
                <OrderConfirm />
              </ComponentDemo>
              <ComponentDemo
                href="/docs/blocks/messaging/message-bubble"
                title="Message Bubble"
              >
                <MessageBubble />
              </ComponentDemo>
              <ComponentDemo
                href="/docs/blocks/miscellaneous/stat-card"
                title="Stat Card"
              >
                <StatCard />
              </ComponentDemo>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
