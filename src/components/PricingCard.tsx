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
        <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.4)] relative group transition-all duration-300 hover:border-[color:var(--color-gold)]/40 hover:bg-white/[0.06]">
          <div className="absolute inset-0 bg-[color:var(--color-gold)]/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <span aria-hidden className="relative">{tier.icon}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/[0.04] text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/20 shadow-sm">{tier.priceLabel}</span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight">{tier.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tier.tagline}</p>

      <div className="mt-6">
        {tier.price.includes('?') ? (
          <div className="font-display font-extrabold text-5xl text-gold-gradient tracking-tight shimmer-text" data-text={tier.price}>
            {tier.price}
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-[color:var(--color-gold)] select-none">৳</span>
            <span className="font-display font-extrabold text-5xl text-gold-gradient tracking-tight tabular-nums shimmer-text" data-text={tier.price.replace('৳', '')}>
              {tier.price.replace('৳', '')}
            </span>
          </div>
        )}
      </div>

      <div className="gold-rule my-6" />

      <Section title="Features" icon="✨" items={tier.features} />
      <Section title="Free Bonus" icon="🎁" items={tier.bonuses} />
      <Section title="Benefits" icon="🎯" items={tier.benefits} />

      <div className="mt-auto pt-6 flex flex-col gap-3">
        {tier.demoLink && (
          <a
            href={tier.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold w-full text-center"
          >
            Visit Demo
          </a>
        )}
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] bg-[color:var(--color-gold)] text-[color:var(--color-ink)]"
        >
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}

function Section({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-gold)] mb-3 flex items-center gap-2">
        <span className="text-lg" aria-hidden>{icon}</span> {title}
      </h4>
      <ul className="space-y-2.5 text-[15px] text-foreground/90 font-medium">
        {items.map((it) => (
          <li key={it} className="flex gap-3 items-start">
            <span aria-hidden className="shrink-0 mt-0.5 text-[color:var(--color-gold)] text-sm">✓</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
