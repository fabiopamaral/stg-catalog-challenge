// app/product/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("product")
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
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          className="object-contain rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600">
          R$ {product.price.toFixed(2)}
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
