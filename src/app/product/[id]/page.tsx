import { cookies } from "next/headers";
import BuyButton from "@/components/BuyButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Product } from "@/types/supabase";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(params.id))
    .single<Product>();

  if (error || !product) {
    return <p className="p-4 text-red-500">Produto não encontrado.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-blue-50 shadow-md rounded-lg overflow-hidden">
        {product.image_url ? (
          <div className="relative w-full h-[480px] p-3">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
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
