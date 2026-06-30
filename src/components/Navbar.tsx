import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, waLink } from "../lib/pricing";
import logoImg from "../assets/logo-transparent.png";
import { api } from "../lib/api";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/95 md:bg-background/70 md:backdrop-blur-md border-b border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="WEBbuilder Studio" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl tracking-tight hidden sm:inline">
            <span className="text-gold-gradient">WEB</span>
            <span className="text-foreground">builder</span>
            <span className="text-muted-foreground text-sm"> Studio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-[color:var(--color-gold)]" }}
              activeOptions={{ exact: n.to === "/" }}
              className="hover:text-[color:var(--color-gold)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={waLink("Hi! I'd like to discuss a website project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !py-2 !px-4 !text-[11px]"
          >
            Get Started
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color:var(--color-border)] bg-background/95">
          <nav className="flex flex-col px-6 py-4 gap-3 text-sm uppercase tracking-[0.15em]">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-muted-foreground hover:text-[color:var(--color-gold)]"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-2 !text-[11px]"
            >
              WhatsApp Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
