export type Project = {
  title: string;
  category: string;
  description: string;
  gradient: string;
  icon: string;
};

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <article className="portfolio-card group" data-cursor="hover">
      {/* Visual area */}
      <div
        className="aspect-[4/3] w-full"
        style={{ background: project.gradient }}
      >
        <div className="h-full w-full grid place-items-center">
          <span className="text-6xl opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500">
            {project.icon}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="portfolio-overlay flex flex-col justify-end p-6">
        <span className="eyebrow-chip mb-3 self-start">{project.category}</span>
        <h3 className="font-display text-2xl">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Always-visible bottom info */}
      <div className="p-5 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg group-hover:text-[color:var(--color-gold)] transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {project.category}
            </p>
          </div>
          <span className="h-8 w-8 grid place-items-center rounded-full border border-white/10 text-muted-foreground group-hover:border-[color:var(--color-gold)]/40 group-hover:text-[color:var(--color-gold)] transition-all text-xs">
            →
          </span>
        </div>
      </div>
    </article>
  );
}
