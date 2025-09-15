import type { Metadata } from "next";
import Career from "@/components/Career";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join The Noisy Lab team! We're looking for creative minds, strategic thinkers, and bold personalities to help brands get noticed in a big way. Explore our open positions and apply today.",
  keywords: [
    "marketing jobs",
    "creative careers",
    "marketing agency jobs",
    "brand strategy jobs",
    "digital marketing careers",
    "marketing team",
    "creative positions",
    "marketing careers",
    "agency jobs",
    "marketing opportunities"
  ],
  openGraph: {
    title: "Careers at The Noisy Lab - Join Our Marketing Team",
    description: "Join The Noisy Lab team! We're looking for creative minds, strategic thinkers, and bold personalities to help brands get noticed in a big way.",
    url: "https://thenoisylab.com/career",
    images: [
      {
        url: "/og-career.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at The Noisy Lab - Marketing Agency Jobs",
      },
    ],
  },
  twitter: {
    title: "Careers at The Noisy Lab - Join Our Marketing Team",
    description: "Join The Noisy Lab team! We're looking for creative minds, strategic thinkers, and bold personalities to help brands get noticed in a big way.",
    images: ["/og-career.jpg"],
  },
  alternates: {
    canonical: "https://thenoisylab.com/career",
  },
};

export default function CareerPage() {
  return <Career />;
}
