"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Toast } from "primereact/toast";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useRef<Toast>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsRegistering(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Credenciais inválidas",
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Verifique seu e-mail para continuar o cadastro",
        life: 3000,
        className: "p-3 gap-2",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }

    setIsRegistering(false);
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Cadastrar
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              required
            />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              required
            />
            <input
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:cursor-pointer"
            >
              {isRegistering ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <p className="text-sm text-center text-black">
            Já tem uma conta?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-emerald-700 cursor-pointer underline hover:text-emerald-800"
            >
              Faça login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
