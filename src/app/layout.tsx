import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Navbar } from "@/components/layout/Navbar";
import { Background } from "@/components/ui/Background";
import { Footer } from "@/components/layout/Footer";
import { LazyMotion, domAnimation } from "framer-motion";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPortfolio | MERN Stack Developer",
  description: "Senior Full-Stack Developer specializing in high-performance web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LazyMotion features={domAnimation}>
          <SmoothScroll>
            <Background />
            <Navbar />
            <main className="relative">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </LazyMotion>
      </body>
    </html>
  );
}
