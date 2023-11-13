import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const titilium = Titillium_Web({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataWiz",
  description:
    "Welcome to DataWiz, where data meets insight and transforms your digital world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titilium.className} bg-primaryBg`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
