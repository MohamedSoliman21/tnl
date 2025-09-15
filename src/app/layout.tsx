import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Noisy Lab - Marketing Agency | Get Noticed In a Big Way",
    template: "%s | The Noisy Lab"
  },
  description: "The Noisy Lab is a bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns through disruptive creativity and strategy.",
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
    "brand storytelling"
  ],
  authors: [{ name: "The Noisy Lab" }],
  creator: "The Noisy Lab",
  publisher: "The Noisy Lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thenoisylab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thenoisylab.com',
    siteName: 'The Noisy Lab',
    title: 'The Noisy Lab - Marketing Agency | Get Noticed In a Big Way',
    description: 'The Noisy Lab is a bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns through disruptive creativity and strategy.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Noisy Lab - Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Noisy Lab - Marketing Agency | Get Noticed In a Big Way',
    description: 'The Noisy Lab is a bold marketing agency that helps brands get noticed in a big way. We create smart, bold, and impossible-to-ignore campaigns.',
    images: ['/og-image.jpg'],
    creator: '@thenoisylab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Noisy Lab",
    "description": "A bold marketing agency that helps brands get noticed in a big way through disruptive creativity and strategy.",
    "url": "https://thenoisylab.com",
    "logo": "https://thenoisylab.com/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+20-115-4022288",
      "contactType": "customer service",
      "email": "thenoisylabbb@gmail.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG"
    },
    "sameAs": [
      "https://instagram.com/thenoisylab",
      "https://facebook.com/thenoisylab",
      "https://tiktok.com/@thenoisylab",
      "https://linkedin.com/company/thenoisylab"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Marketing Strategy",
        "description": "Strategic marketing planning and brand development"
      },
      {
        "@type": "Service", 
        "name": "Creative Campaigns",
        "description": "Bold and impossible-to-ignore marketing campaigns"
      },
      {
        "@type": "Service",
        "name": "Brand Development", 
        "description": "Brand storytelling and awareness building"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-white">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
