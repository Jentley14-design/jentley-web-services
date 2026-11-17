import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Jentley Web Design" },
      { name: "description", content: "Custom websites, redesigns, landing pages, and ongoing website care from Jentley." },
      { property: "og:title", content: "Services — Jentley Web Design" },
      { property: "og:description", content: "Custom websites, redesigns, landing pages, and website care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const services = [
  { n: "01", title: "Custom Websites", text: "A full website designed and built from scratch around your business and goals." },
  { n: "02", title: "Landing Pages", text: "One focused, high-impact page for a product, event, or launch." },
  { n: "03", title: "Website Redesigns", text: "Give an outdated site a modern, faster, mobile-friendly refresh." },
  { n: "04", title: "Online Stores", text: "Sell your products online with a clean, easy-to-use shop." },
  { n: "05", title: "Updates & Care", text: "Ongoing edits, new content, and fixes so your site stays current." },
  { n: "06", title: "Branding Help", text: "Colors, fonts, and style guidance so everything looks consistent." },
];

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">Services</p>
      <h1 className="max-w-3xl text-4xl sm:text-6xl">What we can build for you.</h1>
      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.n} className="group bg-background p-8 transition-colors hover:bg-card">
            <span className="font-display text-sm text-accent">{s.n}</span>
            <h2 className="mt-4 text-2xl">{s.title}</h2>
            <p className="mt-3 text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg text-muted-foreground">Not sure what you need? Reach out for a free chat.</p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/contact">Get in touch</Link>
        </Button>
      </div>
    </section>
  );
}
