import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./RouteLayout";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Auryon - Fund Your Favorite One's Aura",
  description:
    "Boost your favorite one's aura with Auryon – fund their projects and goals, and join a creative community today.",
  keywords: ["Auryon", "funding", "aura", "support", "platform", "community"],
  authors: [{ name: "Auryon Team", url: "https://auryon.vercel.app/" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Auryon - Fund Your Favorite One's Aura",
    description:
      "Boost your favorite one's aura with Auryon – fund their projects and goals, and join a creative community today.",
    url: "https://auryon.vercel.app/",
    siteName: "Auryon",
    images: [
      {
        url: "https://auryon.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Auryon OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auryon - Fund Your Favorite One's Aura",
    description:
      "Boost your favorite one's aura with Auryon – fund their projects and goals, and join a creative community today.",
    images: ["https://auryon.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden overflow-y-scroll ${geistSans.variable} ${geistMono.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>

        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
