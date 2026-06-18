import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "../hooks/use-reveal";
import { CONTACT } from "../lib/pricing";
import logoImg from "../assets/webbuilder-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WEBbuilder Studio" },
      { name: "description", content: "Founded to bridge stunning aesthetics with ruthless conversion strategy. 3+ years engineering digital ecosystems for luxury brands." },
      { property: "og:title", content: "About — WEBbuilder Studio" },
      { property: "og:description", content: "An independent studio building luxury-grade websites." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { t: "Craft over quantity", d: "We take fewer projects and finish them properly." },
  { t: "Speed of trust", d: "Clear communication, on-time delivery, no surprises." },
  { t: "Stay with the work", d: "Lifetime tech guidance means we're a phone call away." },
];

function About() {
  useReveal();
  return (
    <>
      <section className="relative overflow-hidden pt-20 lg:pt-28 pb-16">
        <div className="orb-gold top-10 left-1/4" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center relative">
          <div className="reveal">
            <span className="eyebrow-chip">✦ Founded by Sheikh Mahiul Islam</span>
          </div>
          <h1 className="reveal stagger-1 mt-8 font-display text-5xl md:text-7xl leading-[1.05]">
            About <span className="text-gold-gradient font-serif italic">WEBbuilder Studio</span>
          </h1>
          <p className="reveal stagger-2 mt-8 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Building high-converting websites that drive real business growth. We fuse digital craftsmanship with strategic precision to elevate enterprise brands.
          </p>
          <div className="reveal stagger-3 mt-10 flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-gold">Get Free Consultation →</a>
            <Link to="/services" className="btn-outline-gold">View Services</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal relative">
          <div className="absolute inset-0 bg-[color:var(--color-gold)]/5 rounded-xl blur-2xl -translate-x-4 translate-y-4" aria-hidden />
          <div className="glass-panel glass-border-gradient rounded-xl p-2 relative">
            <div className="aspect-[3/2] rounded-lg bg-gradient-to-br from-[#1a1408] via-[#0f0a04] to-black grid place-items-center overflow-hidden">
              <img src={logoImg} alt="WEBbuilder Studio Logo" className="w-48 h-auto object-contain" />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 glass-panel glass-border-gradient rounded-xl p-6 z-20">
            <p className="font-display text-4xl text-[color:var(--color-gold)]">10×</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">ROI Average</p>
          </div>
        </div>
        <div className="reveal stagger-1">
          <h2 className="font-display text-3xl md:text-5xl">Our Story &amp; <span className="text-gold-gradient font-serif italic">Philosophy</span></h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>Founded by Sheikh Mahiul Islam, WEBbuilder Studio was born from a singular vision: to bridge the gap between stunning aesthetics and ruthless conversion strategy.</p>
            <p>We don't just build websites; we engineer digital ecosystems tailored for high-tier clients. Every pixel is placed with intent, every interaction designed to guide users toward your primary business objectives.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="font-display text-2xl md:text-3xl italic font-serif">"Design is not just what it looks like. Design is how it converts."</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">— Sheikh Mahiul Islam</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="reveal">
          <h2 className="font-display text-4xl md:text-5xl">What we <span className="text-gold-gradient font-serif italic">value</span></h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.t} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-xl p-8`}>
              <h3 className="font-display text-2xl">{v.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-6 sm:grid-cols-3 text-center">
        {[
          { n: "3+", l: "Years of mastery" },
          { n: "50+", l: "Websites delivered" },
          { n: "∞", l: "Lifetime support" },
        ].map((s, i) => (
          <div key={s.l} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-2xl p-10`}>
            <div className="font-display text-6xl text-gold-gradient">{s.n}</div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-24">
        <div className="glass-panel glass-border-gradient rounded-2xl p-10 md:p-16 text-center reveal relative overflow-hidden">
          <div className="orb-gold -top-32 -right-32" aria-hidden />
          <h2 className="relative font-display text-4xl md:text-5xl">Let's build your <span className="text-gold-gradient font-serif italic">next website</span></h2>
          <p className="relative mt-5 max-w-xl mx-auto text-muted-foreground">
            Ready to elevate your digital presence? Partner with us to craft a bespoke experience that drives measurable growth.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-gold">Get Free Consultation</a>
            <Link to="/contact" className="btn-outline-gold">Contact Now ↗</Link>
          </div>
        </div>
      </section>
    </>
  );
}
