"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from "@/types/supabase";

type BuyButtonProps = {
  product: Product;
};

export default function BuyButton({ product }: BuyButtonProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const userId = session.user.id;

    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", product.id)
      .single();

    let insertError = null;

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);
      insertError = error;
    } else {
      const { error } = await supabase.from("cart_items").insert([
        {
          user_id: userId,
          product_id: product.id,
          quantity: 1,
        },
      ]);
      insertError = error;
    }

    if (insertError) {
      console.error(insertError);
      alert("Erro ao adicionar ao carrinho.");
      return;
    }

    router.push("/cart");
  };

  return (
    <button
      onClick={handleClick}
      disabled={!product}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 hover:cursor-pointer"
    >
      Comprar
    </button>
  );
}
