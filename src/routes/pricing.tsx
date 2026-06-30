import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TIERS as STATIC_TIERS, Tier } from "../lib/pricing";
import { PricingCard } from "../components/PricingCard";
import { useReveal } from "../hooks/use-reveal";
import { api } from "../lib/api";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — WEBbuilder Studio (৳5,000 to ৳34,999)" },
      { name: "description", content: "Transparent BDT pricing for landing pages, e-commerce, booking and full company websites. All packages include lifetime support." },
      { property: "og:title", content: "Pricing — WEBbuilder Studio" },
      { property: "og:description", content: "Four packages from ৳5,000 to ৳34,999. Pick your tier." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  const [tiers, setTiers] = useState<Tier[]>(STATIC_TIERS);
  useReveal([tiers]);

  useEffect(() => {
    api.get("/pricing")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTiers(data);
        }
      })
      .catch((err) => console.error("Failed to fetch pricing", err));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pt-20 lg:pt-28 pb-12">
        <div className="orb-gold top-0 right-0" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center relative">
          <div className="reveal"><span className="eyebrow-chip">Investment Tiers</span></div>
          <h1 className="reveal stagger-1 mt-6 font-display text-5xl md:text-7xl leading-[1.05]">
            Tailored <span className="text-gold-gradient">Digital Solutions</span>
          </h1>
          <p className="reveal stagger-2 mt-6 mx-auto max-w-2xl text-muted-foreground text-lg">
            Experience bespoke digital craftsmanship designed to elevate your brand. Transparent, premium pricing for elite digital presences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative pt-6">
          {tiers.map((t, i) => (
            <div key={t.id || t.slug} className={`reveal stagger-${i + 1} relative`}><PricingCard tier={{ ...t, id: t.id || t.slug }} /></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20 text-center">
        <h2 className="reveal font-display text-3xl md:text-4xl">Not sure which to pick?</h2>
        <p className="reveal stagger-1 mt-3 text-muted-foreground">Send a quick WhatsApp — we'll suggest the right tier for your goals.</p>
      </section>
    </>
  );
}
