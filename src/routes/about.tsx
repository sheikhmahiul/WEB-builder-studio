import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "../hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WEBbuilder Studio" },
      { name: "description", content: "3+ years crafting premium websites for businesses across Bangladesh and beyond. Independent, focused, dependable." },
      { property: "og:title", content: "About — WEBbuilder Studio" },
      { property: "og:description", content: "An independent studio building luxury-grade websites." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { t: "Craft over quantity", d: "We take fewer projects, and finish them properly." },
  { t: "Speed of trust", d: "Clear communication, on-time delivery, no surprises." },
  { t: "Stay with the work", d: "Lifetime tech guidance means we're a phone call away." },
];

function About() {
  useReveal();
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 lg:px-10 pt-20 pb-16">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">Our Story</span>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">
          An independent studio building <span className="text-gold-gradient italic">luxury-grade</span> websites.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          WEBbuilder Studio started with a simple frustration: most "premium" websites in our region are templated, slow, and forgotten the day they launch. We do the opposite — bespoke design, engineered performance, and lifetime support that means it.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Over 3+ years we've shipped landing pages, storefronts, booking systems and full company sites for founders who care about how their brand shows up online.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <h2 className="font-display text-4xl md:text-5xl reveal">What we value</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.t} className="reveal pricing-card !rounded-xl p-8">
              <h3 className="font-display text-2xl text-gold-gradient">{v.t}</h3>
              <p className="mt-3 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-6 sm:grid-cols-3 text-center">
        {[
          { n: "3+", l: "Years of experience" },
          { n: "50+", l: "Websites delivered" },
          { n: "∞",   l: "Lifetime support" },
        ].map((s) => (
          <div key={s.l} className="reveal pricing-card !rounded-2xl p-10">
            <div className="font-display text-6xl text-gold-gradient">{s.n}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>
    </>
  );
}
