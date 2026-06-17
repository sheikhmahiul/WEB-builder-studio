import { createFileRoute } from "@tanstack/react-router";
import { TIERS } from "../lib/pricing";
import { PricingCard } from "../components/PricingCard";
import { useReveal } from "../hooks/use-reveal";

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
  useReveal();
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10 text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">Investment Tiers</span>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">
          Premium pricing,<br />
          <span className="text-gold-gradient italic">honest numbers.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg">
          Four packages in BDT. Every plan includes lifetime technical guidance and launch assistance.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 relative pt-6">
          {TIERS.map((t) => (
            <div key={t.id} className="reveal relative"><PricingCard tier={t} /></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-16 text-center">
        <h2 className="font-display text-3xl">Not sure which to pick?</h2>
        <p className="mt-2 text-muted-foreground">Send a quick WhatsApp — we'll suggest the right tier for your goals.</p>
      </section>
    </>
  );
}
