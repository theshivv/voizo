import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppBar from "./components/AppBar";
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Voizo - Voice Out Anonymously",
  description: "An anonymous social media platform where users can voice their thoughts freely.",
  openGraph: {
    title: "Voizo - Voice Out Anonymously",
    description: "An anonymous social media platform where users can voice their thoughts freely.",
    url: "https://voizo.vercel.app", // Replace with your website URL
    images: [
      {
        url: "/voizo_logo.webp", // Path to the image in the public folder
        width: 1200,
        height: 630,
        alt: "Voizo - Voice Out Anonymously",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voizo - Voice Out Anonymously",
    description: "An anonymous social media platform where users can voice their thoughts freely.",
    images: ["/voizo_logo.webp"], // Path to the image in the public folder
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AppBar />
        <main className="container mx-auto px-4 py-8 mb-16 md:mb-0 md:mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
