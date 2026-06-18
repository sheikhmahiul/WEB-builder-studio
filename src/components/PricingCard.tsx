import { type Tier, waLink } from "../lib/pricing";

export function PricingCard({ tier }: { tier: Tier }) {
  const message = `Hi! I'm interested in the ${tier.name} (${tier.price}) package. Can we discuss?`;
  return (
    <article
      data-cursor="hover"
      className={`pricing-card rounded-2xl p-8 flex flex-col h-full ${tier.featured ? "featured" : ""}`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
             style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-soft))", color: "var(--color-primary-foreground)" }}>
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-3xl" aria-hidden>{tier.icon}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-gold)]">{tier.priceLabel}</span>
      </div>

      <h3 className="mt-5 font-display text-2xl leading-tight">{tier.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{tier.tagline}</p>

      <div className="mt-6 relative">
        <div className="font-sans font-light text-5xl text-gold-gradient tracking-tight tabular-nums">{tier.price}</div>
        <div className="absolute inset-0 shimmer opacity-40 pointer-events-none" aria-hidden />
      </div>

      <div className="gold-rule my-6" />

      <Section title="Features" icon="✅" items={tier.features} />
      <Section title="Free Bonus" icon="🎁" items={tier.bonuses} />
      <Section title="Benefits" icon="✔️" items={tier.benefits} />

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 ${tier.featured ? "btn-gold" : "btn-outline-gold"} w-full`}
      >
        Order on WhatsApp
      </a>
    </article>
  );
}

function Section({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="mt-4">
      <h4 className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-gold)] mb-2">{title}</h4>
      <ul className="space-y-1.5 text-sm text-foreground/90">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span aria-hidden className="shrink-0">{icon}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
