"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BuyButton from "@/components/BuyButton";
import { Product } from "@/types/supabase";
import Link from "next/link";
import { Info } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar produtos:", error.message);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-center text-gray-200">
        Carregando Católogo...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-center text-gray-200">
        Nenhum produto disponível.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-blue-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform duration-200 transform hover:scale-[1.02]"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover p-3"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                Sem imagem
              </div>
            )}

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>

              <p className="text-neutral-900 font-bold text-lg">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                })}
              </p>
              <span className="text-gray-500 text-xs">
                Ou em até 12x de{" "}
                {(product.price / 12).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                })}{" "}
                sem juros
              </span>
              <Link href={`./product/${product.id}`}>
                <div className=" mt-2 flex items-center gap-3">
                  <p className=" text-xs text-emerald-700 cursor-pointer underline hover:text-emerald-800">
                    Mais informações
                  </p>
                  <Info
                    className="bg-white text-green-700 rounded-full border-0"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            </div>
            <div className="pt-2">
              <BuyButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
