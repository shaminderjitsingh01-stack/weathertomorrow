import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weather Tomorrow — Tomorrow's Weather Forecast",
    template: "%s | Weather Tomorrow",
  },
  description:
    "Get tomorrow's weather forecast instantly. Simple, fast, beautiful. No clutter — just tomorrow's weather for any city in the world.",
  keywords: [
    "weather tomorrow",
    "tomorrow weather",
    "tomorrow forecast",
    "weather forecast tomorrow",
    "will it rain tomorrow",
    "weather tomorrow near me",
  ],
  metadataBase: new URL("https://weathertomorrow.app"),
  openGraph: {
    title: "Weather Tomorrow — Tomorrow's Weather Forecast",
    description:
      "Get tomorrow's weather forecast instantly. Simple, fast, beautiful.",
    url: "https://weathertomorrow.app",
    siteName: "Weather Tomorrow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Tomorrow",
    description:
      "Get tomorrow's weather forecast instantly. Simple, fast, beautiful.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://weathertomorrow.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
