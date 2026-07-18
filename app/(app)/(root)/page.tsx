import { CommandBox } from "@/components/command-box";
import { ComponentPreview } from "@/components/component-preview";
import { HomeCtas } from "@/components/home-ctas";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

const showcaseItems = [
  {
    name: "amount-input",
    title: "Amount Input",
  },
  {
    name: "message-bubble",
    title: "Message Bubble",
  },
  {
    name: "status-badge",
    title: "Status Badge",
  },
  {
    name: "stat-card",
    title: "Stat Card",
  },
];

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <h1 className="max-w-7xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl from-foreground via-foreground to-foreground/65 bg-linear-to-b bg-clip-text text-transparent">
              Beautiful MCP UIs, made simple
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Ready-to-use, customizable React components for MCP Apps.
              <br className="hidden sm:block" />
              Built with Base UI. Distributed via shadcn.
            </p>

            <CommandBox className="mt-4 w-full max-w-xl" />

            <HomeCtas className="mt-4" />
          </div>
        </section>

        <section className="container-wrapper pb-8 lg:pb-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {showcaseItems.map((item) => (
                <ComponentPreview
                  key={item.name}
                  className="h-full"
                  name={item.name}
                  showcase
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
