import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServicesPageContent from "@/components/ServicesPageContent";

export const metadata: Metadata = {
    title: "Services - The Noisy Lab",
    description: "Discover our comprehensive marketing services at The Noisy Lab. From strategy & planning to creative branding, paid advertising, and digital marketing - we help brands get noticed in a big way.",
    keywords: [
        "marketing services",
        "digital marketing",
        "brand strategy",
        "creative branding",
        "paid advertising",
        "content creation",
        "social media marketing",
        "marketing agency services",
        "brand development",
        "marketing strategy",
        "advertising campaigns",
        "digital marketing solutions"
    ],
    openGraph: {
        title: "Services - The Noisy Lab Marketing Agency",
        description: "Discover our comprehensive marketing services at The Noisy Lab. From strategy & planning to creative branding, paid advertising, and digital marketing.",
        url: "https://thenoisylab.com/services",
        images: [
            {
                url: "/og-services.jpg",
                width: 1200,
                height: 630,
                alt: "Services - The Noisy Lab Marketing Agency",
            },
        ],
    },
    twitter: {
        title: "Services - The Noisy Lab Marketing Agency",
        description: "Discover our comprehensive marketing services at The Noisy Lab. From strategy & planning to creative branding, paid advertising, and digital marketing.",
        images: ["/og-services.jpg"],
    },
    alternates: {
        canonical: "https://thenoisylab.com/services",
    },
};

export default function ServicesPage() {
    return <ServicesPageContent />;
}
