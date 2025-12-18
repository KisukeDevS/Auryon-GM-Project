import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./RouteLayout";
import Script from "next/script"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Auryon - Fund Your Favorite One's Aura",
  description:
    "Discover Auryon, the ultimate platform to boost your favorite one's aura by funding their goals and projects. Join the community and make a difference today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://auryon.vercel.app/" />

        {/* Meta tags */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Auryon, funding, aura, support, platform, community" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auryon.vercel.app/" />
        <meta property="og:image" content="https://auryon.vercel.app/og-image.jpg" /> {/* Replace with your OG image */}
        <meta property="og:site_name" content="Auryon" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://auryon.vercel.app/og-image.jpg" /> {/* Replace with your OG image */}

        {/* External Script */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`overflow-x-hidden overflow-y-scroll ${geistSans.variable} ${geistMono.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
