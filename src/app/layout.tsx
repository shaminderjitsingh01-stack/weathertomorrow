import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weather Tomorrow — Tomorrow's Weather Forecast for Any City",
    template: "%s | Weather Tomorrow",
  },
  description:
    "Get tomorrow's weather forecast instantly for any city in the world. Temperature, rain chance, hourly forecast, what to wear, and activity suggestions. Free, fast, updated hourly.",
  keywords: [
    "weather tomorrow",
    "tomorrow weather",
    "tomorrow forecast",
    "weather forecast tomorrow",
    "will it rain tomorrow",
    "weather tomorrow near me",
    "tomorrow temperature",
  ],
  metadataBase: new URL("https://weathertomorrow.app"),
  icons: {
    icon: [
      { url: "/api/logo/favicon?size=32", sizes: "32x32", type: "image/png" },
      { url: "/api/logo/favicon?size=48", sizes: "48x48", type: "image/png" },
      { url: "/api/logo/favicon?size=192", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/api/logo/favicon?size=180", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Weather Tomorrow — Tomorrow's Forecast, Instantly",
    description:
      "Get tomorrow's weather forecast for any city. Temperature, rain, wind, UV, hourly breakdown & what to wear.",
    url: "https://weathertomorrow.app",
    siteName: "Weather Tomorrow",
    type: "website",
    images: ["/api/logo/thumbnail"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Tomorrow",
    description:
      "Tomorrow's weather forecast for any city. Fast, free, updated hourly.",
    images: ["/api/logo/thumbnail"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T9EJK952KQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-T9EJK952KQ');`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
