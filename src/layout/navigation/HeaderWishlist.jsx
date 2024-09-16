"use client";
import { useAppSelector } from "@/redux/hooks";
import { size } from "lodash";
import { Heart } from "lucide-react";
import Link from "next/link";
export default function HeaderWishlist() {
    const { wishlistItems, loading } = useAppSelector((state) => state.wishlist);

  return (
    <Link href="/wishlist" className="hidden md:flex relative">
      <Heart size={22} />
      {wishlistItems && size(wishlistItems) > 0 && (
        <span className="absolute top-0  -right-1 w-2.5 h-2.5 border border-white bg-red-500 rounded-full"></span>
      )}
    </Link>
  );
}
