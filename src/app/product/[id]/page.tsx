// app/product/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (!error) {
        setProduct(data);
      } else {
        console.log("Erro ao buscar o produto", error.message);
      }

      setLoading(false);
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-4">Carregando...</p>;

  if (!product)
    return <p className="p-4 text-red-500">Produto não encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-blue-50 shadow-md rounded-lg overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover p-3 min-h-[480px]"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}

        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-800 truncate">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm line-clamp-3">
            {product.description || "Sem descrição"}
          </p>

          <p className="text-neutral-900 font-bold text-xl">
            R${" "}
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
            })}
          </p>

          <span className="text-gray-500 text-xs block">
            Ou em até 12x de R${" "}
            {(product.price / 12).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
            })}{" "}
            sem juros
          </span>

          <div className="pt-4">
            <BuyButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
