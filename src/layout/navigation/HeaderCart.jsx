"use client";
import { useAppSelector } from "@/redux/hooks";
import { size } from "lodash";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
export default function HeaderCart() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <Link href="/checkout" className="relative">
      <ShoppingCart size={22} />
      {cart && size(cart.cart) > 0 && (
        <span className="absolute top-0  -right-1 w-2.5 h-2.5 border border-white bg-red-500 rounded-full"></span>
      )}
    </Link>
  );
}
