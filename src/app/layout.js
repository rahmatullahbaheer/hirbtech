import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd, { getOrganizationSchema } from "@/components/JsonLd";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RB-Tech | Web, Mobile & Software Development Company",
    template: "%s | RB-Tech"
  },
  description: "RB-Tech builds high-performance websites, web apps, mobile apps, desktop software, SaaS platforms and AI-powered digital solutions for businesses and startups.",
  keywords: [
    "web development company",
    "web development services",
    "website development",
    "web application development",
    "mobile app development",
    "Android app development",
    "iOS app development",
    "React Native development",
    "Flutter development",
    "Next.js development",
    "custom software development",
    "SaaS development",
    "AI development services",
    "AI application development",
    "e-commerce development",
    "API development",
    "UI/UX design",
    "software development company",
    "custom software solutions",
    "desktop application development",
    "business automation software"
  ],
  authors: [{ name: "RB-Tech" }],
  creator: "RB-Tech",
  publisher: "RB-Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "RB-Tech | Web, Mobile & Software Development Company",
    description: "RB-Tech builds high-performance websites, web apps, mobile apps, desktop software, SaaS platforms and AI-powered digital solutions.",
    url: siteUrl,
    siteName: "RB-Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RB-Tech | Web, Mobile & Software Development Company",
    description: "RB-Tech builds high-performance websites, web apps, mobile apps, desktop software, SaaS platforms and AI solutions.",
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
  alternates: {
    canonical: siteUrl,
  }
};

export default function RootLayout({ children }) {
  const orgSchema = getOrganizationSchema(siteUrl);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={orgSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
