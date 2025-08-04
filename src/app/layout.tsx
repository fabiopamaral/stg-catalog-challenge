// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "E-commerce",
  description: "Sistema completo de e-commerce com Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 shadow-md">Minha Loja</header>

        <main className="p-4">{children}</main>

        <footer className="p-4 text-center text-sm text-gray-500">
          © 2025 Minha Loja
        </footer>
      </body>
    </html>
  );
}
