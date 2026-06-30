import { CONTACT } from "../lib/pricing";

export function WhatsAppButton() {
  return (
    <a
      href={`${CONTACT.whatsappLink}?text=${encodeURIComponent("Hi! I'd like to discuss a website project.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="hover"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full inline-flex items-center justify-center shadow-2xl transition-all duration-300 group hover:scale-110 hover:-rotate-12 bg-[color:var(--color-gold)]"
      style={{
        boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
      }}
    >
      <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-[color:var(--color-gold)]" style={{ animationDuration: '2s' }} />
      <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-ink)" className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.156 5.162 0 11.479 0c3.058.001 5.933 1.19 8.096 3.355 2.162 2.164 3.351 5.037 3.351 8.097 0 6.326-5.16 11.482-11.482 11.482a11.393 11.393 0 01-5.819-1.595L0 24zm6.29-4.754c1.646.977 3.473 1.493 5.334 1.494 5.503 0 9.978-4.475 9.982-9.982.001-2.668-1.037-5.176-2.927-7.067C16.848 1.8 14.343.762 11.677.762c-5.505 0-9.98 4.475-9.983 9.981-.001 2.052.537 4.053 1.56 5.807l-.278.476-1.033 3.771 3.86-1.013.483-.287zm12.518-5.321c-.328-.164-1.942-.958-2.242-1.069-.3-.11-.519-.164-.738.164-.219.328-.847 1.069-1.039 1.288-.192.219-.384.246-.712.083-.328-.164-1.386-.51-2.64-1.627-1.032-.92-1.727-2.057-1.929-2.404-.202-.347-.021-.535.143-.699.148-.147.328-.384.492-.575.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.738-1.779-1.01-2.435-.265-.636-.53-.55-.738-.56-.192-.01-.411-.012-.629-.012-.218 0-.575.082-.875.411-.3.328-1.147 1.122-1.147 2.736 0 1.614 1.176 3.174 1.339 3.393.164.219 2.313 3.53 5.602 4.954.783.339 1.395.541 1.872.692.786.25 1.5.215 2.065.13.629-.094 1.942-.794 2.216-1.533.274-.738.274-1.37.192-1.503-.082-.132-.3-.219-.629-.384z"/>
      </svg>
    </a>
  );
}
