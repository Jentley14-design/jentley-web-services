import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Palette, Rocket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jentley — Custom Website Design & Development" },
      { name: "description", content: "Jentley builds clean, fast, custom websites for businesses and individuals." },
      { property: "og:title", content: "Jentley — Custom Website Design & Development" },
      { property: "og:description", content: "Clean, fast, custom websites for businesses and individuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const points = [
  { icon: Palette, title: "Designed for you", text: "A look that fits your brand — never a cookie-cutter template." },
  { icon: Code2, title: "Built right", text: "Fast, mobile-friendly sites that work on every screen." },
  { icon: Rocket, title: "Launched fast", text: "From first call to live site, quickly and without hassle." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
          <p className="fade-up mb-6 text-sm uppercase tracking-[0.3em] text-accent">Web design & development</p>
          <h1 className="fade-up max-w-4xl text-5xl leading-[1.02] sm:text-7xl">
            Websites that make your business look as good as it is.
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg text-muted-foreground">
            We design and build custom websites — from simple landing pages to full business sites.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Start your project <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">See services</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-px border-y border-border bg-border sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="bg-background p-8">
            <p.icon className="mb-5 h-7 w-7 text-accent" />
            <h3 className="mb-2 text-xl">{p.title}</h3>
            <p className="text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h2 className="text-3xl sm:text-5xl">Ready to get online?</h2>
        <p className="mt-4 text-muted-foreground">Call, text, or email — we'll get back to you quickly.</p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/contact">Contact us</Link>
        </Button>
      </section>
    </>
  );
}
