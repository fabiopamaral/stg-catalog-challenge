import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Link from "next/link";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata = {
  title: "E-commerce",
  description: "e-commerce system with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-900 font-sans">
        <div className="flex flex-col min-h-screen bg-emerald-900">
          <header className="shadow-md px-6 py-4 flex justify-between items-center bg-emerald-950">
            <Link href="/" className="text-xl font-bold text-white">
              <Image src="/logo-stg.png" alt="Logo" width={50} height={50} />
            </Link>
            <Navbar />
          </header>

          <main className="flex-grow p-0">{children}</main>

          <footer className="bg-emerald-950 text-center text-sm text-gray-200 py-4 shadow-inner">
            © {new Date().getFullYear()} STG e-commerce. Todos os direitos
            reservados.
          </footer>
        </div>
      </body>
    </html>
  );
}
