import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "../hooks/use-reveal";
import { CONTACT } from "../lib/pricing";
import logoImg from "../assets/webbuilder-logo.png";
import { TestimonialCard } from "../components/TestimonialCard";

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
  { t: "Craft over quantity", d: "We take fewer projects and finish them properly. Each website receives meticulous attention to detail." },
  { t: "Speed of trust", d: "Clear communication, on-time delivery, no surprises. We believe transparency builds long-lasting partnerships." },
  { t: "Stay with the work", d: "Lifetime tech guidance means we're a phone call away long after your project is deployed." },
];

function About() {
  useReveal();
  return (
    <>
      <section className="relative overflow-hidden pt-20 lg:pt-28 pb-16">
        <div className="orb-gold top-10 left-1/4" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center relative">
          <div className="reveal">
            <span className="eyebrow-chip">✦ The Studio</span>
          </div>
          <h1 className="reveal stagger-1 mt-8 font-display text-5xl md:text-7xl leading-[1.05]">
            About <span className="text-gold-gradient">WEBbuilder</span>
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
        <div className="reveal relative group">
          <div className="absolute inset-0 bg-[color:var(--color-gold)]/5 rounded-xl blur-2xl -translate-x-4 translate-y-4 transition-all duration-500 group-hover:bg-[color:var(--color-gold)]/10" aria-hidden />
          <div className="portfolio-card p-2 relative">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#1a1408] via-[#0f0a04] to-black grid place-items-center overflow-hidden relative">
              {/* If you have a founder photo, put it here. Otherwise, the logo is great! */}
              <img src={logoImg} alt="WEBbuilder Studio Logo" className="w-48 h-auto object-contain scale-100 group-hover:scale-105 transition-transform duration-700" />
              <div className="portfolio-overlay flex flex-col justify-end p-6 pointer-events-none"></div>
            </div>
            
            {/* Overlay tag on the image */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                <div>
                    <div className="text-white font-display text-xl">Sheikh Mahiul Islam</div>
                    <div className="text-[10px] text-white/70 uppercase tracking-widest mt-1">Founder & Lead Engineer</div>
                </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 glass-panel glass-border-gradient rounded-xl p-6 z-20 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
            <p className="font-display text-4xl text-[color:var(--color-gold)]">10×</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">ROI Average</p>
          </div>
        </div>
        <div className="reveal stagger-1">
          <h2 className="font-display text-3xl md:text-5xl">Our Story &amp; <span className="text-gold-gradient">Philosophy</span></h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>Founded by Sheikh Mahiul Islam, WEBbuilder Studio was born from a singular vision: to bridge the gap between stunning aesthetics and ruthless conversion strategy.</p>
            <p>We don't just build websites; we engineer digital ecosystems tailored for high-tier clients. Every pixel is placed with intent, every interaction designed to guide users toward your primary business objectives.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="font-display text-2xl md:text-3xl text-white/90">"Design is not just what it looks like. Design is how it converts."</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">— Sheikh Mahiul Islam</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="reveal text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl">What we <span className="text-gold-gradient">value</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.t} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-xl p-8 hover:bg-white/[0.04] transition-colors`}>
              <h3 className="font-display text-2xl text-white/90">{v.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.d}</p>
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
            Let's build your <span className="text-gold-gradient">next website</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your digital presence? Partner with us to craft a bespoke experience that drives measurable growth.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-gold !text-sm !py-4 !px-8">
              Start Your Project →
            </a>
            <Link to="/contact" className="btn-outline-gold !text-sm !py-4 !px-8">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
