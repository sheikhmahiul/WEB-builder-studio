import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, waLink } from "../lib/pricing";

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

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name} (${form.email}). ${form.message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 py-20 grid gap-16 lg:grid-cols-2">
      <div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">Contact</span>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
          Let's <span className="text-gold-gradient italic">talk.</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg">
          Fastest reply on WhatsApp. Or send a brief and we'll get back within a few hours.
        </p>

        <div className="mt-10 space-y-4">
          <ContactRow label="WhatsApp" value={CONTACT.whatsappNumber} href={CONTACT.whatsappLink}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 003.7 17.3L2 22l4.8-1.6A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-2.8 1 1-2.7-.2-.3A8 8 0 1112 20z"/></svg>} />
          <ContactRow label="Messenger" value="Chat on Messenger" href={CONTACT.messenger}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2z"/></svg>} />
          <ContactRow label="Facebook Page" value="facebook.com/webbuilder" href={CONTACT.facebook}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2.1C16.6 2 15.3 2 14.3 2 11.5 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>} />
          <ContactRow label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pricing-card !rounded-2xl p-8">
        <h2 className="font-display text-2xl">Send a brief</h2>
        <p className="mt-1 text-sm text-muted-foreground">Submitting opens WhatsApp pre-filled with your message.</p>

        <div className="mt-6 space-y-4">
          <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@company.com" />
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Project details</label>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5} placeholder="Tell us about your project, timeline, and budget."
              className="w-full rounded-md bg-[color:var(--color-input)] border border-[color:var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--color-gold)]"/>
          </div>
          <button type="submit" className="btn-gold w-full">Send via WhatsApp →</button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</label>
      <input required type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-[color:var(--color-input)] border border-[color:var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--color-gold)]"/>
    </div>
  );
}

function ContactRow({ label, value, href, icon }: { label: string; value: string; href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-4 pricing-card !rounded-xl p-5 group">
      <span className="h-10 w-10 inline-flex items-center justify-center rounded-full text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 group-hover:bg-[color:var(--color-gold)]/10 transition">
        {icon}
      </span>
      <span>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium group-hover:text-[color:var(--color-gold)] transition">{value}</div>
      </span>
    </a>
  );
}
