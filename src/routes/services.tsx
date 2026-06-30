import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "../hooks/use-reveal";
import { CONTACT } from "../lib/pricing";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { api } from "../lib/api";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — WEBbuilder Studio" },
      { name: "description", content: "Landing pages, e-commerce, booking systems and full company websites. Premium design, fast delivery, lifetime support." },
      { property: "og:title", content: "Services — WEBbuilder Studio" },
      { property: "og:description", content: "Premium web design & development services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const STATIC_SERVICES = [
  { icon: "✶", title: "Landing Pages", description: "Single-page sites engineered to convert. Hero, offer, social proof, contact — all calibrated.", points: ["Premium UI design", "Mobile responsive", "SEO foundations", "WhatsApp integration"] },
  { icon: "◈", title: "E-Commerce", description: "Full storefronts with cart, checkout, COD and admin. Sell while you sleep.", points: ["Product & category mgmt", "Order tracking", "Admin dashboard", "WhatsApp orders"] },
  { icon: "❖", title: "Booking & Business", description: "Service businesses get appointment booking, inquiry forms and maps — fully managed.", points: ["Appointment booking", "Inquiry forms", "Google Maps", "5–10 pages"] },
  { icon: "✦", title: "Company Websites", description: "Flagship brand presence with CMS, blog, portfolio, team — built to scale.", points: ["Dynamic CMS", "Blog system", "Lead generation", "Google Analytics"] },
];

function Services() {
  const [services, setServices] = useState<any[]>(STATIC_SERVICES);
  useReveal([services]);

  useEffect(() => {
    api.get("/services")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => console.error("Failed to fetch services", err));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pt-20 lg:pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 relative">
          <div className="reveal"><span className="eyebrow-chip">Services</span></div>
          <h1 className="reveal stagger-1 mt-6 font-display text-5xl md:text-7xl leading-[1.05]">
            What we <span className="text-gold-gradient">build</span>
          </h1>
          <p className="reveal stagger-2 mt-6 max-w-2xl text-muted-foreground text-lg">
            Four focused practices, every one of them delivered to luxury standards.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="glass-panel glass-border-gradient rounded-2xl p-10 grid gap-8 md:grid-cols-4 text-center reveal">
          <div>
            <div className="stat-number">50+</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Projects Delivered</div>
          </div>
          <div>
            <div className="stat-number">100%</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Client Satisfaction</div>
          </div>
          <div>
            <div className="stat-number">24/7</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Lifetime Support</div>
          </div>
          <div>
            <div className="stat-number">3+</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <article key={s.title} className={`reveal stagger-${i + 1} glass-panel glass-border-gradient rounded-2xl p-8`}>
            <div className="text-3xl text-[color:var(--color-gold)] font-display">{s.icon}</div>
            <h2 className="mt-5 font-display text-3xl">{s.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
              {s.points && s.points.map((p: string) => (
                <li key={p} className="flex gap-2 items-start text-muted-foreground">
                  <span className="text-[color:var(--color-gold)]">✓</span>{p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="relative overflow-hidden py-24 bg-[color:var(--color-ink)]/30 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow-chip mb-4">How it works</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Our <span className="text-gold-gradient">Process</span></h2>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 text-center">
        <h2 className="reveal font-display text-4xl md:text-5xl">Find the <span className="text-gold-gradient">right fit</span></h2>
        <p className="reveal stagger-1 mt-4 text-muted-foreground">See packaged pricing or message us directly.</p>
        <div className="reveal stagger-2 mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/pricing" className="btn-gold">View Pricing</Link>
          <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">WhatsApp</a>
        </div>
      </section>
    </>
  );
}
