"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import { LogIn, LogOut, ShoppingCart, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListner } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      authListner?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCartClick = () => {
    if (session) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="space-x-4 flex">
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm text-white">
              Bem-vindo, {session.user.email}
            </span>

            <button
              onClick={handleCartClick}
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200 cursor-pointer"
            >
              <span>Carrinho</span>
              <ShoppingCart width={20} height={20} />
            </button>

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

            <button
              onClick={handleCartClick}
              className="text-white flex justify-center items-center gap-2 hover:text-slate-300 transition duration-200 cursor-pointer"
            >
              <span>Carrinho</span>
              <ShoppingCart width={20} height={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
