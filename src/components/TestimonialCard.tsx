export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  stars: number;
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "var(--color-gold)" : "none"}
          stroke={i < count ? "var(--color-gold)" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="glass-panel glass-border-gradient rounded-2xl p-8 relative flex flex-col h-full group hover:border-[color:var(--color-gold)]/30 transition-all duration-300">
      <span className="quote-mark" aria-hidden>
        &ldquo;
      </span>

      <Stars count={testimonial.stars} />

      <blockquote className="mt-5 flex-1 text-foreground/90 leading-relaxed text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="mt-6 pt-5 border-t border-white/5">
        <p className="font-display text-base">{testimonial.name}</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
          {testimonial.role}
        </p>
      </div>
    </article>
  );
}
