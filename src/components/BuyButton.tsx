"use client";

import { usePathname, useRouter } from "next/navigation";
import { Product } from "@/types/supabase";

type BuyButtonProps = {
  product: Product;
};

export default function BuyButton({ product }: BuyButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    const isOnProductPage = pathname.startsWith("/product/");

    if (isOnProductPage) {
      router.push(`/cart?productId=${product.id}`);
    } else {
      router.push(`/product/${product.id}`);
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
