export const CONTACT = {
  whatsappNumber: "+8801918445314",
  whatsappLink: "https://wa.me/8801918445314",
  facebook: "https://www.facebook.com/profile.php?id=61575863429413",
  messenger: "https://m.me/61575863429413",
  email: "hello@webbuilder.studio",
} as const;

export function waLink(message: string) {
  return `${CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`;
}

export type Tier = {
  id: string;
  icon: string;
  name: string;
  price: string;
  priceLabel: string;
  tagline: string;
  featured?: boolean;
  features: string[];
  bonuses: string[];
  benefits: string[];
};

export const TIERS: Tier[] = [
  {
    id: "landing",
    icon: "🥉",
    name: "Simple Landing Page",
    price: "৳5,000",
    priceLabel: "Starter",
    tagline: "Convert visitors with a premium one-page site.",
    features: [
      "Premium Landing Page Design",
      "Mobile Responsive Layout",
      "Contact Form",
      "WhatsApp Integration",
      "Basic SEO Setup",
      "SSL Security Setup",
      "Fast Loading Optimization",
    ],
    bonuses: [
      "Lifetime After-Sales Support",
      "Lifetime Technical Guidance",
      "Website Launch Assistance",
    ],
    benefits: ["More Leads", "Build Trust", "Professional Presence"],
  },
  {
    id: "ecommerce",
    icon: "🥈",
    name: "E-Commerce Website",
    price: "৳18,999",
    priceLabel: "Sell Online",
    tagline: "Full storefront with cart, checkout & admin.",
    features: [
      "Premium E-commerce Design",
      "Product Management",
      "Category Management",
      "Shopping Cart & Checkout",
      "Cash on Delivery",
      "WhatsApp Order Integration",
      "Admin Dashboard",
      "Mobile Responsive Layout",
      "Basic SEO Setup",
      "SSL Security Setup",
    ],
    bonuses: [
      "FREE 1 Year Domain (.com / .net / .org)",
      "Lifetime Technical Guidance",
      "Free SSL Certificate",
      "Website Launch Assistance",
    ],
    benefits: ["Sell 24/7", "Easy Order Management", "More Revenue", "Grow Online"],
  },
  {
    id: "booking",
    icon: "🥇",
    name: "Custom Booking / Business Website",
    price: "৳21,999",
    priceLabel: "Service Business",
    tagline: "Bookings, inquiries & business pages, beautifully done.",
    features: [
      "5–10 Custom Pages",
      "Premium UI / UX Design",
      "Appointment Booking System",
      "Contact & Inquiry Forms",
      "WhatsApp Integration",
      "Google Maps Integration",
      "Admin Dashboard",
      "Mobile Responsive Layout",
      "SEO Optimization",
      "SSL Security Setup",
    ],
    bonuses: [
      "FREE 1 Year Domain",
      "Lifetime Technical Guidance",
      "Free SSL Certificate",
      "Website Launch Assistance",
    ],
    benefits: ["More Clients", "Automated Booking", "Save Time", "Build Credibility"],
  },
  {
    id: "professional",
    icon: "👑",
    name: "Professional Company Website",
    price: "৳34,999",
    priceLabel: "Most Popular",
    tagline: "Flagship brand presence with CMS, blog & analytics.",
    featured: true,
    features: [
      "Fully Custom Premium Design",
      "10+ Pages",
      "Advanced Admin Panel",
      "Dynamic CMS",
      "Blog System",
      "Portfolio & Team Sections",
      "Lead Generation Forms",
      "Advanced SEO",
      "Performance Optimization",
      "SSL Security Setup",
      "Google Analytics Setup",
    ],
    bonuses: [
      "FREE 1 Year Domain",
      "Lifetime Technical Guidance",
      "Free SSL Certificate",
      "Website Launch Assistance",
    ],
    benefits: [
      "Premium Brand Authority",
      "Higher Customer Trust",
      "More Conversions",
      "Long-Term Business Growth",
    ],
  },
];
