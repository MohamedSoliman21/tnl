import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Values from "@/components/Values";

export const metadata: Metadata = {
  title: "Home",
  description: "The Noisy Lab - A bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns through disruptive creativity and strategy.",
  keywords: [
    "marketing agency",
    "brand strategy", 
    "creative marketing",
    "digital marketing",
    "brand awareness",
    "marketing campaigns",
    "brand development",
    "marketing consulting",
    "creative agency",
    "brand storytelling",
    "get noticed",
    "bold marketing"
  ],
  openGraph: {
    title: "The Noisy Lab - Marketing Agency | Get Noticed In a Big Way",
    description: "The Noisy Lab is a bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns through disruptive creativity and strategy.",
    url: "https://thenoisylab.com",
    images: [
      {
        url: "/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "The Noisy Lab - Marketing Agency Homepage",
      },
    ],
  },
  twitter: {
    title: "The Noisy Lab - Marketing Agency | Get Noticed In a Big Way",
    description: "The Noisy Lab is a bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns.",
    images: ["/og-homepage.jpg"],
  },
  alternates: {
    canonical: "https://thenoisylab.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Values />
    </>
  );
}
