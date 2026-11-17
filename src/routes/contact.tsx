import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jentley Web Design" },
      { name: "description", content: "Call 351-244-1711 or 978-872-7805, or email Jentley14@gmail.com to start your website." },
      { property: "og:title", content: "Contact — Jentley Web Design" },
      { property: "og:description", content: "Call, text, or email Jentley to start your website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const items = [
  { icon: Phone, label: "Phone", value: "351-244-1711", href: "tel:+13512441711" },
  { icon: Phone, label: "Phone", value: "978-872-7805", href: "tel:+19788727805" },
  { icon: Mail, label: "Email", value: "Jentley14@gmail.com", href: "mailto:Jentley14@gmail.com" },
];

function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
      <h1 className="max-w-3xl text-4xl sm:text-6xl">Let's build your website.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">Call, text, or email anytime.</p>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <a
            key={i.value}
            href={i.href}
            className="group rounded-md border border-border bg-card p-8 transition-colors hover:border-accent"
          >
            <i.icon className="h-6 w-6 text-accent" />
            <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">{i.label}</p>
            <p className="mt-2 break-all font-display text-xl group-hover:text-accent">{i.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
