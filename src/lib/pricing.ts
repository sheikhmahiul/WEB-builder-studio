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
  demoLink?: string;
  features: string[];
  bonuses: string[];
  benefits: string[];
};

export const TIERS: Tier[] = [
  {
    id: "landing",
    icon: "🥉",
    name: "Simple Landing Page",
    price: "৳1,999",
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
    price: "৳5,999",
    priceLabel: "Sell Online",
    tagline: "Full storefront with cart, checkout & admin.",
    featured: true,
    demoLink: "https://demo.webbuilder.studio", // Added visit link
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
      "FREE 1 Year Domain",
      "Lifetime Technical Guidance",
      "Free SSL Certificate",
      "Website Launch Assistance",
    ],
    benefits: ["Sell 24/7", "Easy Order Management", "More Revenue", "Grow Online"],
  },
  {
    id: "custom",
    icon: "👑",
    name: "Custom Build Website",
    price: "৳?????",
    priceLabel: "Let's Talk",
    tagline: "Amra je kono web custom vabe build kore dite pari.",
    features: [
      "Fully Custom Premium Design",
      "Unlimited Pages",
      "Advanced Admin Panel",
      "Dynamic CMS & Blog System",
      "Custom Features & Logic",
      "Advanced SEO",
      "Performance Optimization",
      "SSL Security Setup",
    ],
    bonuses: [
      "FREE 1 Year Domain",
      "Lifetime Technical Guidance",
      "Free SSL Certificate",
      "Website Launch Assistance",
    ],
    benefits: [
      "Tailored to your needs",
      "Premium Brand Authority",
      "More Conversions",
      "Long-Term Business Growth",
    ],
  },
];
