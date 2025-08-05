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
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 shadow-md flex justify-between">
          <div>Minha Loja</div>
          <nav>
            <Link href="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </nav>
        </header>

        <main className="p-4">{children}</main>

        <footer className="p-4 text-center text-sm text-gray-500">
          © 2025 Minha Loja
        </footer>
      </body>
    </html>
  );
}
