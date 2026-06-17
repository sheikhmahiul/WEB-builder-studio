import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TIERS, CONTACT, waLink } from "../lib/pricing";
import { PricingCard } from "../components/PricingCard";
import { useReveal } from "../hooks/use-reveal";
import { GlobeHero } from "../components/GlobeHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WEBbuilder Studio — Luxury Web Design & Development" },
      { name: "description", content: "Premium landing pages, e-commerce, booking & company websites from ৳5,000. 3+ years experience, lifetime support, mobile-first." },
      { property: "og:title", content: "WEBbuilder Studio — Luxury Web Design" },
      { property: "og:description", content: "Premium websites from ৳5,000. Lifetime support. Built for business growth." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const CORE = [
  { icon: "✶", t: "Web Design", d: "Bespoke UI / UX rooted in the Aureate Digital Noir principles." },
  { icon: "</>", t: "Web Development", d: "Robust, scalable architecture using cutting-edge modern frameworks." },
  { icon: "◈", t: "E-commerce", d: "High-conversion online storefronts engineered for luxury retail." },
  { icon: "❖", t: "Business Sites", d: "Corporate platforms that establish unshakeable digital authority." },
];

const WORKS = [
  { t: "Aether Financial", k: "Fintech Platform", grad: "from-[#1a1a1f] via-[#0f0f14] to-black" },
  { t: "Lumina Luxe", k: "E-Commerce Experience", grad: "from-[#1a1408] via-[#0f0a04] to-black" },
];

const WHY = [
  { t: "3+ Years Mastery", d: "Proven expertise in delivering high-end digital solutions for discerning clients." },
  { t: "Modern Design", d: "Clean, minimalist aesthetics that prioritize content and luxury typography." },
  { t: "Fast Loading", d: "Optimized architectures ensuring frictionless user experiences." },
  { t: "Lifetime Support", d: "Unwavering commitment to maintaining your digital asset's integrity." },
];

function Home() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name} (${form.email}). ${form.message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="orb-gold top-[-10rem] right-[-8rem]" aria-hidden />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24 grid lg:grid-cols-2 gap-10 items-center relative">
          <div className="relative z-10">
            <div className="reveal">
              <span className="eyebrow-chip">✦ Premium Digital Craftsmanship</span>
            </div>
            <h1 className="reveal stagger-1 mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
              <span className="block">We Build</span>
              <span className="block"><span className="text-gold-gradient font-serif italic">Modern &amp;</span></span>
              <span className="block"><span className="text-gold-gradient font-serif italic">Powerful</span> Websites</span>
            </h1>
            <p className="reveal stagger-2 mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Professional Web Design &amp; Development Solutions For Businesses Worldwide. We engineer digital experiences that look like bespoke timepieces and perform flawlessly.
            </p>
            <div className="reveal stagger-3 mt-10 flex flex-wrap gap-3">
              <a href={waLink("Hi! I'd like a free consultation about my website.")} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Get Free Consultation →
              </a>
              <Link to="/pricing" className="btn-outline-gold">View Pricing</Link>
            </div>
          </div>
          <div className="relative h-[420px] md:h-[560px] lg:h-[640px] reveal stagger-2">
            <GlobeHero />
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* Core competencies */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal">
          <h2 className="font-display text-4xl md:text-5xl">Core Competencies</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Precision-engineered solutions tailored for luxury brands and high-tier enterprise clients.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE.map((c, i) => (
            <div key={c.t} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-xl p-7 group hover:border-[color:var(--color-gold)]/40 transition`}>
              <div className="text-2xl text-[color:var(--color-gold)] font-display group-hover:scale-110 transition-transform origin-left">{c.icon}</div>
              <h3 className="mt-5 font-display text-xl">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Works */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 reveal">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Selected Works</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">A curated gallery of recent high-end digital deployments.</p>
          </div>
          <Link to="/services" className="link-underline text-[color:var(--color-gold)] text-xs uppercase tracking-[0.25em]">
            View all projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {WORKS.map((w, i) => (
            <article key={w.t} className={`reveal stagger-${i + 1} group`}>
              <div className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br ${w.grad} glass-border-gradient border border-white/5`}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-3/4 h-2/3 rounded-lg border border-[color:var(--color-gold)]/30 grid place-items-center bg-black/40">
                    <div className="font-display text-3xl text-gold-gradient">{w.t}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{w.t}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">{w.k}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 reveal">
          <div>
            <span className="eyebrow-chip mb-4">Investment Tiers</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Tailored Digital Solutions</h2>
          </div>
          <Link to="/pricing" className="btn-outline-gold">Full comparison →</Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {TIERS.map((t, i) => (
            <div key={t.id} className={`reveal stagger-${i + 1} relative`}><PricingCard tier={t} /></div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="reveal max-w-2xl">
          <span className="eyebrow-chip">Why Choose Us</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">The WEBbuilder <span className="text-gold-gradient font-serif italic">Advantage</span></h2>
          <p className="mt-4 text-muted-foreground">
            We deliver more than websites; we construct digital assets engineered for performance, security, and aesthetic dominance.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <div key={w.t} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-xl p-7`}>
              <div className="h-10 w-10 rounded-lg grid place-items-center text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 bg-[color:var(--color-gold)]/5 font-display">✓</div>
              <h3 className="mt-5 font-display text-lg">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Initiate Consultation */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="glass-panel glass-border-gradient rounded-2xl p-8 md:p-14 grid lg:grid-cols-2 gap-12 reveal relative overflow-hidden">
          <div className="orb-gold -top-32 -left-32" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl">Initiate <span className="text-gold-gradient font-serif italic block md:inline">Consultation</span></h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              Ready to elevate your digital presence? Reach out to discuss your requirements. We typically respond within 4 hours.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-foreground/90 hover:text-[color:var(--color-gold)] transition">
                <span className="h-9 w-9 grid place-items-center rounded-md border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)]">✉</span>
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/90 hover:text-[color:var(--color-gold)] transition">
                <span className="h-9 w-9 grid place-items-center rounded-md border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)]">☎</span>
                {CONTACT.whatsappNumber}
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="relative space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-luxury" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Email Address</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-luxury" placeholder="john@company.com" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Project Details</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-luxury resize-none" placeholder="Briefly describe your requirements…" />
            </div>
            <button type="submit" className="btn-gold w-full">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}
