import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const faceOfYesterday = localFont({
  src: "./fonts/Face of Yesterday.ttf",
  variable: "--font-face-of-yesterday",
  display: "swap",
});

const spete = localFont({
  src: "./fonts/SPETETRIAL.ttf",
  variable: "--font-spete",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EPOW",
  description: "soundwave artist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${faceOfYesterday.variable} ${spete.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
