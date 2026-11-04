import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description =
  "Welcome to Simplifyr, where complexity meets simplicity. Software, Accounting, Web Development and HR Solutions — One Stop Solution.";

export const metadata: Metadata = {
  metadataBase: new URL("https://simplifyr.in"),
  title: "Simplifyr",
  description,
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-512.png", type: "image/png", sizes: "512x512" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://simplifyr.in/",
    siteName: "Simplifyr",
    title: "Simplifyr — where complexity meets simplicity",
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Simplifyr — where complexity meets simplicity" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@simplifyr_in",
    title: "Simplifyr — where complexity meets simplicity",
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#010102",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
