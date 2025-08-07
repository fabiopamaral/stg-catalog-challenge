"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/supabase";
import { supabase } from "@/lib/supabase";

export default function BuyButton({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && product.id) {
      router.push(`/product/${product.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 hover:cursor-pointer"
      onClick={handleClick}
    >
      Comprar
    </button>
  );
}
