// src/app/layout.tsx
import Link from "next/link";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "E-commerce",
  description: "e-commerce system with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-900 font-sans">
        <div className="flex flex-col min-h-screen bg-emerald-950">
          <header className="shadow-md px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              STG e-commerce
            </Link>
            <nav className="space-x-4">
              <Link href="/login" className="hover:underline text-white">
                Entrar
              </Link>
              <Link href="/cart" className="hover:underline text-white">
                Carrinho
              </Link>
            </nav>
          </header>

          <main className="flex-grow p-0">{children}</main>

          <footer className="bg-emerald-900 opacity-20 text-center text-sm text-gray-200 py-4 shadow-inner">
            © STG e-commerce
          </footer>
        </div>
      </body>
    </html>
  );
}
