"use-client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";


import Link from "next/link";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Note Vault",
  description: "A decentralized note-taking application powered by Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-100 text-gray-900`}>
        <WalletContextProvider>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-lg p-4">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-800">Solana Note Vault</h1>
                  <nav className="hidden md:flex gap-4 text-gray-600">
                    <Link href="/" className="hover:text-cyan-600 transition-colors">
                      Home
                    </Link>
                    <Link href="/docs" className="hover:text-cyan-600 transition-colors">
                      Docs
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
    
                </div>
              </div>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="bg-gray-800 text-white text-center p-4">
              <p className="text-sm">© 2025 Solana Note Vault. All rights reserved.</p>
            </footer>
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}