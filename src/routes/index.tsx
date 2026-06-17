import { createFileRoute, Link } from "@tanstack/react-router";
import { TIERS, waLink } from "../lib/pricing";
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


const WHY = [
  { t: "3+ Years Mastery", d: "Proven expertise in delivering high-end digital solutions for discerning clients." },
  { t: "Modern Design", d: "Clean, minimalist aesthetics that prioritize content and luxury typography." },
  { t: "Fast Loading", d: "Optimized architectures ensuring frictionless user experiences." },
  { t: "Lifetime Support", d: "Unwavering commitment to maintaining your digital asset's integrity." },
];

function Home() {
  useReveal();

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

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="reveal max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl">About <span className="text-gold-gradient font-serif italic">WEBbuilder</span> Studio</h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              WEBbuilder Studio is a modern website design and development agency founded by Sheikh Mahiul Islam. We help businesses, startups, e-commerce brands, and service providers establish a powerful online presence through premium, fast-loading, and conversion-focused websites.
            </p>
            <p>
              Our goal is simple: to build websites that not only look professional but also help businesses attract customers, generate leads, and grow revenue. Every project is developed with a strong focus on performance, user experience, security, and scalability.
            </p>
            <p>
              From landing pages and e-commerce stores to business websites and custom web applications, we deliver solutions tailored to each client's unique goals and requirements.
            </p>
          </div>
          <h3 className="mt-10 font-display text-2xl">Why Choose WEBbuilder Studio?</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              3+ Years Experience
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              Premium UI/UX Design
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              Mobile-Responsive Development
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              Fast & Secure Websites
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              SEO-Friendly Structure
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              Lifetime Technical Guidance
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
              Professional Communication
            </li>
          </ul>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            At WEBbuilder Studio, we believe a website should be more than just an online presence—it should be a powerful tool that helps your business grow and succeed in the digital world.
          </p>
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

    </>
  );
}
