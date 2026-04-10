import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Waypoints — Drop a Waypoint. Share Your Journey.",
    template: "%s | Waypoints",
  },
  description:
    "A build-in-public journal for indie makers and solopreneurs. Log what you shipped, share to socials with one click.",
  metadataBase: new URL("https://waypoints.fyi"),
  openGraph: {
    title: "Waypoints — Drop a Waypoint. Share Your Journey.",
    description:
      "A build-in-public journal for indie makers and solopreneurs. Log what you shipped, share to socials with one click.",
    url: "https://waypoints.fyi",
    siteName: "Waypoints",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waypoints — Drop a Waypoint. Share Your Journey.",
    description:
      "A build-in-public journal for indie makers and solopreneurs. Log what you shipped, share to socials with one click.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
