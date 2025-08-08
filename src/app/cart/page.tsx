"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";
import { useRouter } from "next/navigation";
import {
  CircleMinus,
  CirclePlus,
  CreditCard,
  ShoppingCart,
  X,
} from "lucide-react";

export default function CartPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(productId))
        .single();

      if (!error && data) {
        setProduct(data);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  if (!product) return <p className="p-4">Carregando produto...</p>;

  const total = product.price * quantity;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Resumo da compra</h1>

      <div className="flex items-center gap-4 bg-blue-50 rounded-md shadow p-4">
        <img
          src={product.image_url || ""}
          alt={product.name}
          className="w-32 h-32 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-gray-800 text-lg font-semibold">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm">{product.description}</p>

          <div className="mt-2">
            <span className="text-sm text-gray-500">Preço unitário:</span>{" "}
            <span className="font-bold text-neutral-900">
              {product.price.toLocaleString("pt-BR", {
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
              onClick={() => handleQuantityChange(quantity - 1)}
              className=" text-neutral-900 text-lg hover:text-slate-600 cursor-pointer"
            >
              <CircleMinus />
            </button>
            <span className="text-neutral-900 text-lg font-bold w-6 text-center h">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className=" text-neutral-900 text-lg hover:text-slate-600 cursor-pointer"
            >
              <CirclePlus />
            </button>
          </div>
        </div>
      </div>

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
        <button
          onClick={() => router.back()}
          className="min-w-24 px-3 bg-blue-50 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-md transition-colors duration-200 cursor-pointer"
        >
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
