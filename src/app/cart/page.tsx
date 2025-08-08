"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";
import Image from "next/image";

export default function CartPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(productId))
        .single();

      if (!error) {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p className="p-4">Carregando produto...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resumo da Compra</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <div className="relative w-full h-60">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold">
          Total:{" "}
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              alert("Compra confirmada!");
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
