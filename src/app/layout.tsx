import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Navbar } from "@/components/layout/Navbar";
import { Background } from "@/components/ui/Background";
import { Footer } from "@/components/layout/Footer";
import { LazyMotion, domAnimation } from "framer-motion";
import { WebVitals } from "@/components/ui/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniyal Saddiqui | MERN Stack Developer",
  description: "Full-Stack Developer with 1+ year of professional experience crafting high-performance, user-centric web solutions that solve real-world problems.",
  keywords: ["MERN Stack Developer", "Full Stack Developer", "React Developer", "Node.js Developer", "Web Developer", "Portfolio"],
  authors: [{ name: "Daniyal Saddiqui" }],
  creator: "Daniyal Saddiqui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.vercel.app",
    title: "Daniyal Saddiqui | MERN Stack Developer",
    description: "Full-Stack Developer with 1+ year of professional experience crafting high-performance, user-centric web solutions.",
    siteName: "Daniyal Saddiqui Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniyal Saddiqui | MERN Stack Developer",
    description: "Full-Stack Developer with 1+ year of professional experience crafting high-performance, user-centric web solutions.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://your-portfolio.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        <LazyMotion features={domAnimation}>
          <Background />
          <Navbar />
          <main className="relative" role="main">
            {children}
          </main>
          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}
