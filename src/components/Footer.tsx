import { Link } from "@tanstack/react-router";
import { CONTACT } from "../lib/pricing";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--color-border)] bg-[color:var(--color-ink)]/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">
            <span>WEB</span><span className="text-gold-gradient">builder</span><span> Studio</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Premium web design & development for ambitious businesses. Crafted in Bangladesh, built for the world.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2.1C16.6 2 15.3 2 14.3 2 11.5 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>
            </a>
            <a href={CONTACT.messenger} target="_blank" rel="noopener noreferrer" aria-label="Messenger"
               className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2zm1 12.4l-2.6-2.8-5 2.8 5.5-5.8 2.7 2.8 4.9-2.8-5.5 5.8z"/></svg>
            </a>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
               className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 003.7 17.3L2 22l4.8-1.6A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-2.8 1 1-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3.1 4.9 4.3 1.8.7 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)] mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)] mb-4">Get in touch</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>WhatsApp: <a className="text-foreground hover:text-[color:var(--color-gold)]" href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">{CONTACT.whatsappNumber}</a></li>
            <li>Messenger: <a className="text-foreground hover:text-[color:var(--color-gold)]" href={CONTACT.messenger} target="_blank" rel="noopener noreferrer">m.me/webbuilder</a></li>
            <li>Facebook: <a className="text-foreground hover:text-[color:var(--color-gold)]" href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Our Page</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)] py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} WEBbuilder Studio. All rights reserved.
      </div>
    </footer>
  );
}
