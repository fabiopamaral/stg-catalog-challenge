"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha inválidos.");
    } else {
      router.push("/");
    }

    setIsLoggingIn(false);
  }

  function goRegister() {
    router.push("/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-blue-50 shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:cursor-pointer"
            >
              {isLoggingIn ? "Entrando..." : "Entrar"}
            </button>

            <button
              onClick={goRegister}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:cursor-pointer"
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
