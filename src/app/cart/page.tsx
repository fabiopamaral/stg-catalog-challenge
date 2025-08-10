"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CartItems } from "@/types/supabase";
import {
  CircleMinus,
  CirclePlus,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

export default function CartPage() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setItems([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          user_id,
          product_id,
          quantity,
          created_at,
          product:products (*)
        `
        )
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
        setItems([]);
      } else {
        setItems(data as CartItems[]);
      }

      setLoading(false);
    }

    fetchCart();
  }, [supabase]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const previous = items;
    const updated = items.map((it) =>
      it.id === itemId ? { ...it, quantity: newQuantity } : it
    );

    setItems(updated);

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (error) {
      // reverte e avisa
      setItems(previous);
      console.error("Erro ao atualizar quantidade:", error);
      alert("Não foi possível atualizar a quantidade. Tente novamente.");
    }
  };

  const total = items.reduce((acc, item) => {
    const price = Number(item.product?.price ?? 0);
    return acc + price * item.quantity;
  }, 0);

  if (loading) {
    return <p className="p-4">Carregando carrinho...</p>;
  }

  if (items.length === 0) {
    return <p className="p-4">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Resumo da compra</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-blue-50 rounded-md shadow p-4"
        >
          <img
            src={item.product.image_url || ""}
            alt={item.product.name}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-gray-800 text-lg font-semibold">
              {item.product.name}
            </h2>
            <p className="text-gray-500 text-sm">{item.product.description}</p>

            <div className="mt-2">
              <span className="text-sm text-gray-500">Preço unitário:</span>{" "}
              <span className="font-bold text-neutral-900">
                {item.product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-slate-600 text-sm font-medium">
                Quantidade:
              </span>
              <button
                className=" text-neutral-900 text-lg hover:text-slate-600 cursor-pointer"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                <CircleMinus />
              </button>
              <span className="text-neutral-900 text-lg font-bold w-6 text-center h">
                {item.quantity}
              </span>
              <button
                className=" text-neutral-900 text-lg hover:text-slate-600 cursor-pointer"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <CirclePlus />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-right text-xl font-bold">
        Total:{" "}
        {total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        <p className="text-xs flex justify-end items-center gap-2">
          <CreditCard className="" />
          Ou 12x de{" "}
          {(total / 12).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2,
          })}{" "}
          sem juros
        </p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button className="min-w-24 px-3 bg-blue-50 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-md transition-colors duration-200 cursor-pointer">
          <span>Cancelar</span>
        </button>
        <button
          onClick={() => alert("Compra confirmada!")}
          className="min-w-24 px-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors duration-200 cursor-pointer"
        >
          <span className="flex justify-center gap-1 items-center">
            Comprar <ShoppingCart width={20} height={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
