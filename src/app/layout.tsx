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
  title: "Daniyal Saddiqui | MERN Stack Developer & AI Automation Specialist",
  description: "Full-Stack Developer & AI Automation Specialist with 1+ year of experience in MERN stack development and intelligent workflow automation using n8n and make.com.",
  keywords: ["MERN Stack Developer", "AI Automation", "Full Stack Developer", "React Developer", "Node.js Developer", "Web Developer", "n8n", "make.com", "Workflow Automation", "Portfolio"],
  authors: [{ name: "Daniyal Saddiqui" }],
  creator: "Daniyal Saddiqui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastidious-zuccutto-b5453e.netlify.app/",
    title: "Daniyal Saddiqui | MERN Stack Developer & AI Automation Specialist",
    description: "Full-Stack Developer & AI Automation Specialist building scalable web solutions and intelligent automation workflows.",
    siteName: "Daniyal Saddiqui Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniyal Saddiqui | MERN Stack Developer & AI Automation Specialist",
    description: "Full-Stack Developer & AI Automation Specialist building scalable web solutions and intelligent automation workflows.",
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
        <link rel="canonical" href="https://fastidious-zuccutto-b5453e.netlify.app/" />
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
