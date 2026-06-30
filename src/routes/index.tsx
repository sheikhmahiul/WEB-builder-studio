import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TIERS as STATIC_TIERS, waLink, Tier } from "../lib/pricing";
import { PricingCard } from "../components/PricingCard";
import { useReveal } from "../hooks/use-reveal";
import { GlobeHero } from "../components/GlobeHero";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { TestimonialCard } from "../components/TestimonialCard";
import { TechMarquee } from "../components/TechMarquee";
import { api } from "../lib/api";

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

const STATIC_TESTIMONIALS = [
  {
    quote: "WEBbuilder Studio transformed our brand's digital presence. The new site is not just beautiful, it's a lead generation machine.",
    name: "Sarah Jenkins",
    role: "CEO, Luxa Brand",
    stars: 5,
  },
  {
    quote: "The process was seamless and the result exceeded our expectations. Truly premium digital craftsmanship.",
    name: "David Chen",
    role: "Founder, Elevate Architecture",
    stars: 5,
  },
  {
    quote: "Our online sales doubled within the first month of launching the new e-commerce platform.",
    name: "Aisha Khan",
    role: "Director, Aurum Jewelers",
    stars: 5,
  },
];

function Home() {
  const [tiers, setTiers] = useState<Tier[]>(STATIC_TIERS);
  const [testimonials, setTestimonials] = useState<any[]>(STATIC_TESTIMONIALS);
  useReveal([tiers, testimonials]);

  useEffect(() => {
    api.get("/pricing")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTiers(data);
        }
      })
      .catch((err) => console.error("Failed to fetch pricing", err));

    api.get("/testimonials")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => console.error("Failed to fetch testimonials", err));
  }, []);

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
            <h1 className="reveal stagger-1 mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight">
              We Build <br />
              <span className="text-gold-gradient">Modern &amp; Powerful</span><br />
              Websites
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
          <div className="relative hidden md:block md:h-[560px] lg:h-[640px] reveal stagger-2">
            <GlobeHero />
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

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

      {/* Process Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal max-w-3xl mb-16 text-center mx-auto">
          <span className="eyebrow-chip mb-4">Our Methodology</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">The <span className="text-gold-gradient">Process</span></h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A refined, proven workflow designed to translate your vision into an elegant, high-performing digital asset.
          </p>
        </div>
        <ProcessTimeline />
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 relative">
        <div className="gold-rule absolute top-0 w-full left-0" />
        <div className="reveal max-w-3xl pt-10">
          <h2 className="font-display text-4xl md:text-5xl">About <span className="text-gold-gradient">WEBbuilder</span> Studio</h2>
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
            {[
              "3+ Years Experience", "Premium UI/UX Design", "Mobile-Responsive Development", 
              "Fast & Secure Websites", "SEO-Friendly Structure", "Lifetime Technical Guidance", 
              "Professional Communication"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-6 w-6 grid place-items-center rounded border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            At WEBbuilder Studio, we believe a website should be more than just an online presence—it should be a powerful tool that helps your business grow and succeed in the digital world.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[color:var(--color-ink)]/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="eyebrow-chip mb-4">Client Feedback</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Words of <span className="text-gold-gradient">Praise</span></h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`reveal stagger-${i + 1}`}>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
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
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative">
          {tiers.map((t, i) => (
            <div key={t.id || t.slug} className={`reveal stagger-${i + 1} relative`}><PricingCard tier={{ ...t, id: t.id || t.slug }} /></div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="reveal max-w-2xl">
          <span className="eyebrow-chip">Why Choose Us</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">The WEBbuilder <span className="text-gold-gradient">Advantage</span></h2>
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

      {/* Dramatic CTA Banner */}
      <section className="relative overflow-hidden py-32 mt-12 border-t border-[color:var(--color-border)]">
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/50" />
        <div className="cta-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center reveal">
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Ready to build your <span className="text-gold-gradient">legacy?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop losing customers to outdated design. Elevate your brand with a digital experience that commands authority.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={waLink("Hi! I'd like to start a project with WEBbuilder Studio.")} target="_blank" rel="noopener noreferrer" className="btn-gold !text-sm !py-4 !px-8">
              Start Your Project →
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
