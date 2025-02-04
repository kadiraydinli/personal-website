import type { Metadata } from "next";
import { Inter } from "next/font/google";

import userData from "@/app/data/user.json";

import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: userData.name,
  description: userData.about,
  metadataBase: new URL('https://kadiraydinli.com'),
  keywords: userData.keywords,
  authors: [{ name: userData.name }],
  creator: userData.name,
  publisher: userData.name,
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ]
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://kadiraydinli.com",
    siteName: userData.name,
    title: userData.name,
    description: userData.about,
    images: [
      {
        url: "https://kadiraydinli.com/logo.png",
        width: 1200,
        height: 630,
        alt: userData.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: userData.name,
    description: userData.about,
    creator: "@nickname",
    images: ["https://kadiraydinli.com/logo.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 