export function TechMarquee() {
  const techs = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Supabase",
    "Figma",
    "Framer Motion",
    "Three.js",
    "Shopify",
    "Stripe",
    "Vercel",
  ];

  return (
    <div className="relative flex overflow-hidden border-y border-[color:var(--color-border)] bg-[color:var(--color-ink)]/30 py-6">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track">
        {/* Double the array for seamless infinite scroll */}
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="mx-4 tech-item">
            <span className="text-[color:var(--color-gold)]">✧</span>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
