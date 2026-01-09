import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import FloatingAudioPlayer from "@/components/ui/FloatingAudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOVALEM 2026 | Expérience Scrollytelling",
  description: "Découvrez l'histoire et les performances de l'unité de valorisation énergétique SOVALEM.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-512.png",
    apple: "/icon-512.png",
  },
};

export const viewport = {
  themeColor: "#E2001A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <FloatingAudioPlayer />
      </body>
    </html>
  );
}
