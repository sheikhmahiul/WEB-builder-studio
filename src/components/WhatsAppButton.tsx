import { CONTACT } from "../lib/pricing";

export function WhatsAppButton() {
  return (
    <a
      href={`${CONTACT.whatsappLink}?text=${encodeURIComponent("Hi! I'd like to discuss a website project.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="hover"
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full inline-flex items-center justify-center shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 18px 40px -10px rgba(37,211,102,0.55)",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M20.5 3.5A11 11 0 003.7 17.3L2 22l4.8-1.6A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-2.8 1 1-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3.1 4.9 4.3 1.8.7 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z"/>
      </svg>
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(37,211,102,0.35)" }} />
    </a>
  );
}
