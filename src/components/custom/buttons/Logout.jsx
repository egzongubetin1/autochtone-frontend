"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import { resetCart } from "@/redux/features/cart/cartSlice";
import { removeWishlistItem } from "@/redux/features/wishlist/wishlistSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Logout({ style = "" }) {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(removeWishlistItem());

    router.push("/");
  }

  return (
    <Button variant={"ghost"} onClick={handleLogout} className={style}>
      Log out
    </Button>
  );
}
