"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Toast } from "primereact/toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const toast = useRef<Toast>(null);
  const router = useRouter();

  async function signInUser(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);

    const { error } = await signInUser(email, password);

    if (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: error.message || "Erro ao fazer login",
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 2000,
        className: "p-3 gap-2",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }

    setIsLoggingIn(false);
  }

  function handleGoToRegister() {
    router.push("/register");
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-blue-50 shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h1>

          <form className="space-y-4" onSubmit={handleLogin}>
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
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </button>

              <button
                type="button"
                onClick={handleGoToRegister}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
