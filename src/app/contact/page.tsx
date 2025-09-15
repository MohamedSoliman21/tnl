import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The Noisy Lab! Contact our marketing agency for bold campaigns, brand strategy, and creative solutions. Call us at +20 115 4022288 or email thenoisylabbb@gmail.com",
  keywords: [
    "contact marketing agency",
    "get in touch",
    "marketing consultation",
    "brand strategy consultation",
    "marketing agency contact",
    "creative agency contact",
    "marketing services inquiry",
    "brand development contact",
    "marketing consultation call"
  ],
  openGraph: {
    title: "Contact The Noisy Lab - Marketing Agency",
    description: "Get in touch with The Noisy Lab! Contact our marketing agency for bold campaigns, brand strategy, and creative solutions.",
    url: "https://thenoisylab.com/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact The Noisy Lab - Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Contact The Noisy Lab - Marketing Agency",
    description: "Get in touch with The Noisy Lab! Contact our marketing agency for bold campaigns, brand strategy, and creative solutions.",
    images: ["/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://thenoisylab.com/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
