import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, waLink } from "../lib/pricing";
import { useReveal } from "../hooks/use-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WEBbuilder Studio" },
      { name: "description", content: "Chat on WhatsApp, Messenger, or send a project brief. Typical reply within a few hours." },
      { property: "og:title", content: "Contact — WEBbuilder Studio" },
      { property: "og:description", content: "Reach us on WhatsApp, Messenger, or Facebook." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || name.length > 100) return setError("Please enter a valid name (max 100 chars).");
    if (!EMAIL_RE.test(email) || email.length > 255) return setError("Please enter a valid email.");
    if (!message || message.length > 1000) return setError("Message must be 1–1000 characters.");
    setError(null);
    const msg = `Hi! I'm ${name} (${email}). ${message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden mx-auto max-w-6xl px-6 lg:px-10 pt-20 pb-24 grid gap-14 lg:grid-cols-2">
      <div className="orb-gold -top-10 -left-10" aria-hidden />
      <div className="relative reveal">
        <span className="eyebrow-chip">Contact</span>
        <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05]">
          Let's <span className="text-gold-gradient font-serif italic">talk.</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Fastest reply on WhatsApp. Or send a brief and we'll get back within a few hours.
        </p>

        <div className="mt-10 space-y-3">
          <ContactRow label="WhatsApp" value={CONTACT.whatsappNumber} href={CONTACT.whatsappLink} icon="☎" />
          <ContactRow label="Messenger" value="Chat on Messenger" href={CONTACT.messenger} icon="💬" />
          <ContactRow label="Facebook" value="facebook.com/webbuilder" href={CONTACT.facebook} icon="ƒ" />
          <ContactRow label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} icon="✉" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="reveal stagger-1 glass-panel glass-border-gradient rounded-2xl p-8 relative">
        <h2 className="font-display text-2xl">Send a brief</h2>
        <p className="mt-1 text-sm text-muted-foreground">Submitting opens WhatsApp pre-filled with your message.</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Full Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-luxury" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-luxury" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Project Details</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-luxury resize-none" placeholder="Tell us about your project, timeline, and budget." />
          </div>
          <button type="submit" className="btn-gold w-full">Send via WhatsApp →</button>
        </div>
      </form>
    </section>
  );
}

function ContactRow({ label, value, href, icon }: { label: string; value: string; href: string; icon: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-4 glass-panel glass-border-gradient rounded-xl p-5 group hover:border-[color:var(--color-gold)]/40 transition">
      <span className="h-10 w-10 inline-flex items-center justify-center rounded-md text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 bg-[color:var(--color-gold)]/5 font-display">
        {icon}
      </span>
      <span>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium group-hover:text-[color:var(--color-gold)] transition">{value}</div>
      </span>
    </a>
  );
}
