import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "NIRD Purity Test - Village Résistant",
  description: "Découvre ton niveau de résistance aux Big Tech.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${outfit.variable} ${spaceMono.variable} antialiased text-nird-light overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
