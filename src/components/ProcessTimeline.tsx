const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep-dive into your brand, goals, audience, and competitors to define the strategic foundation.",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Design",
    desc: "Crafting bespoke UI/UX with mood boards, wireframes, and high-fidelity prototypes in Aureate Noir style.",
    icon: "🎨",
  },
  {
    num: "03",
    title: "Develop",
    desc: "Pixel-perfect implementation with modern frameworks. Fast, responsive, SEO-optimized, secure.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Launch with domain setup, SSL, analytics, and handover — plus lifetime technical guidance.",
    icon: "🚀",
  },
];

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Desktop horizontal */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-0 relative">
        {/* Connecting line behind steps */}
        <div
          className="absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-[2px] timeline-line reveal"
          aria-hidden
        />

        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`reveal stagger-${i + 1} group flex flex-col items-center text-center px-4 relative z-20`}
          >
            <div className="step-ring z-10 shrink-0 bg-[color:var(--color-ink)]">
              <span>{s.num}</span>
            </div>
            <h3 className="mt-5 font-display text-xl group-hover:text-[color:var(--color-gold)] transition-colors">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden space-y-8">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`reveal stagger-${i + 1} flex gap-5 group`}
          >
            <div className="flex flex-col items-center">
              <div className="step-ring shrink-0">
                <span>{s.num}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-[color:var(--color-gold)]/40 to-transparent" />
              )}
            </div>
            <div className="pb-4">
              <h3 className="font-display text-xl group-hover:text-[color:var(--color-gold)] transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
