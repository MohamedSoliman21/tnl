import type { Metadata } from "next";
import Apply from "@/components/Apply";

export const metadata: Metadata = {
  title: "Apply for a Job",
  description: "Apply for a position at The Noisy Lab! Join our team of creative minds and strategic thinkers. Submit your application with your CV, portfolio, and tell us what makes you impossible to ignore.",
  keywords: [
    "job application",
    "apply for marketing job",
    "marketing agency application",
    "creative job application",
    "marketing career application",
    "join marketing team",
    "marketing job apply",
    "career application form",
    "marketing position application"
  ],
  openGraph: {
    title: "Apply for a Job at The Noisy Lab - Marketing Agency",
    description: "Apply for a position at The Noisy Lab! Join our team of creative minds and strategic thinkers. Submit your application today.",
    url: "https://thenoisylab.com/apply",
    images: [
      {
        url: "/og-apply.jpg",
        width: 1200,
        height: 630,
        alt: "Apply for a Job at The Noisy Lab - Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Apply for a Job at The Noisy Lab - Marketing Agency",
    description: "Apply for a position at The Noisy Lab! Join our team of creative minds and strategic thinkers. Submit your application today.",
    images: ["/og-apply.jpg"],
  },
  alternates: {
    canonical: "https://thenoisylab.com/apply",
  },
};

export default function ApplyPage() {
  return <Apply />;
}
