import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HeaderNav from "@/components/HeaderNav";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-layout="main">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HeaderNav />
        <main className="container-fluid h-100">{children}</main>
      </body>
    </html>
  );
}
