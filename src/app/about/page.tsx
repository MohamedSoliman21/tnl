import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
    title: "About Us - The Noisy Lab",
    description: "Learn about The Noisy Lab's mission to make brands unforgettable through disruptive, viral marketing strategies. Discover our story, values, and innovative approach.",
    keywords: [
        "about us",
        "marketing agency about",
        "The Noisy Lab team",
        "marketing company story",
        "brand marketing experts",
        "creative marketing team",
        "marketing agency mission",
        "digital marketing company",
        "marketing professionals",
        "brand strategy experts",
        "marketing innovation",
        "creative agency about"
    ],
    openGraph: {
        title: "About Us - The Noisy Lab Marketing Agency",
        description: "Learn about The Noisy Lab's mission to make brands unforgettable through disruptive, viral marketing strategies. Discover our story, values, and innovative approach.",
        url: "https://thenoisylab.com/about",
        images: [
            {
                url: "/og-about.jpg",
                width: 1200,
                height: 630,
                alt: "About Us - The Noisy Lab Marketing Agency",
            },
        ],
    },
    twitter: {
        title: "About Us - The Noisy Lab Marketing Agency",
        description: "Learn about The Noisy Lab's mission to make brands unforgettable through disruptive, viral marketing strategies. Discover our story, values, and innovative approach.",
        images: ["/og-about.jpg"],
    },
    alternates: {
        canonical: "https://thenoisylab.com/about",
    },
};

export default function AboutPage() {
    return <AboutPageContent />;
}
