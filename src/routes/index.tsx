import { createFileRoute, Link } from "@tanstack/react-router";
import { TIERS, CONTACT, waLink } from "../lib/pricing";
import { PricingCard } from "../components/PricingCard";
import { useReveal } from "../hooks/use-reveal";
import { GlobeHero } from "../components/GlobeHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WEBbuilder Studio — Luxury Web Design & Development in Bangladesh" },
      { name: "description", content: "Premium landing pages, e-commerce, booking & company websites from ৳5,000. 3+ years experience, lifetime support, mobile-first." },
      { property: "og:title", content: "WEBbuilder Studio — Luxury Web Design" },
      { property: "og:description", content: "Premium websites from ৳5,000. Lifetime support. Built for business growth." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const WHY = [
  { t: "3+ Years Experience", d: "Battle-tested across dozens of brands." },
  { t: "Modern & Premium Design", d: "Stitch-grade aesthetics, never templated." },
  { t: "Fast Loading", d: "Optimized for Core Web Vitals from day one." },
  { t: "Mobile-Friendly", d: "Pixel-perfect on every screen." },
  { t: "Secure & Scalable", d: "SSL, hardening, and clean architecture." },
  { t: "Lifetime Support", d: "We're with you long after launch." },
  { t: "Professional Communication", d: "Clear updates, on time, every time." },
];

const CORE = [
  { icon: "✶", t: "Web Design", d: "Bespoke UI / UX rooted in luxury craft." },
  { icon: "</>", t: "Web Development", d: "Robust, scalable, modern frameworks." },
  { icon: "◈", t: "E-commerce", d: "High-conversion storefronts that sell." },
  { icon: "❖", t: "Business Sites", d: "Brand presence that builds authority." },
];

function Home() {
  useReveal();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 lg:pt-28 pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 rounded-full px-4 py-1.5">
              ✦ Premium Digital Craftsmanship
            </span>
            <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight">
              <span className="block">We Build</span>
              <span className="block text-gold-gradient italic">Modern &amp;</span>
              <span className="block"><span className="text-gold-gradient italic">Powerful</span> Websites</span>
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Professional web design &amp; development for businesses that demand more. We engineer digital experiences that look like bespoke timepieces — and perform flawlessly.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/pricing" className="btn-gold">View Pricing →</Link>
              <a href={waLink("Hi! I'd like a free consultation about my website.")} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                Get Free Consultation
              </a>
            </div>
          </div>
          <div className="relative h-[420px] md:h-[560px] lg:h-[640px]">
            <GlobeHero />
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* Core competencies */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="reveal">
          <h2 className="font-display text-4xl md:text-5xl">Core Competencies</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Precision-engineered solutions tailored for luxury brands and high-tier business clients.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE.map((c) => (
            <div key={c.t} className="reveal pricing-card !rounded-xl p-6">
              <div className="text-2xl text-[color:var(--color-gold)] font-display">{c.icon}</div>
              <h3 className="mt-4 font-display text-xl">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 reveal">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Investment Tiers</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Four packages, transparent pricing in BDT. Choose what fits your stage.
            </p>
          </div>
          <Link to="/pricing" className="btn-outline-gold">See full comparison →</Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {TIERS.map((t) => (
            <div key={t.id} className="reveal relative"><PricingCard tier={t} /></div>
          ))}
        </div>
      </section>

      {/* Why choose me */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="reveal">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">Why Choose Me</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Crafted with discipline. Delivered with care.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.t} className="reveal pricing-card !rounded-xl p-6">
              <div className="text-[color:var(--color-gold)] font-display text-lg">✓ {w.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="pricing-card !rounded-2xl p-10 md:p-16 text-center reveal relative overflow-hidden">
          <div className="shimmer absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
          <h2 className="font-display text-4xl md:text-5xl">Ready to <span className="text-gold-gradient italic">elevate</span> your brand?</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Tell me about your project on WhatsApp or Messenger. I typically respond within a few hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Now</a>
            <a href={CONTACT.messenger} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">Open Messenger</a>
          </div>
        </div>
      </section>
    </>
  );
}
