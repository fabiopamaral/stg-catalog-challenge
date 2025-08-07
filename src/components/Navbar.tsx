"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { LogIn, LogOut, ShoppingCart, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  return (
    <nav className="space-x-4 flex">
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm text-white">
              Bem-vindo, {session.user.email}
            </span>
            <Link
              href="/cart"
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200"
            >
              <span>Carrinho</span>
              <ShoppingCart width={20} height={20} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200 cursor-pointer"
            >
              <span>Logout</span>
              <LogOut width={20} height={20} />
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200"
            >
              <span>Crie sua Conta</span>
              <UserRoundPlus width={20} height={20} />
            </Link>
            <Link
              href="/login"
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200"
            >
              <span>Entrar</span>
              <LogIn width={20} height={20} />
            </Link>

            <Link
              href="/cart"
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200"
            >
              <span>Carrinho</span>
              <ShoppingCart width={20} height={20} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
