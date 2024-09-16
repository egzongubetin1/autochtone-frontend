"use client";
import Loading from "@/components/custom/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { API_RESPONSE } from "@/data/constants";
import { fetchCartAsync } from "@/redux/features/cart/cartThunks";
import { fetchWishlist } from "@/redux/features/wishlist/wishlistThunks";
import { useAppSelector } from "@/redux/hooks";
import { getUserImagePath } from "@/utils/helpers";
import { get } from "lodash";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HeaderAuth() {
 const dispatch = useDispatch();

 const { isAuthenticated, user, fetchStatus } = useAppSelector((state) => state.auth);

 useEffect(() => {
  if (isAuthenticated && fetchStatus === API_RESPONSE.finished) {
   dispatch(fetchCartAsync());
   dispatch(fetchWishlist());
  }
 }, [fetchStatus]);

 if (fetchStatus === "pending")
  return (
   <div className="flex items-center justify-center">
    <Loading />
   </div>
  );

 if (isAuthenticated) {
  const firstInitial = user.firstName.substring(0, 1);
  const lastInitial = user.lastName.substring(0, 1);

  return (
   <Link href="/user" className="hidden md:flex items-center gap-2">
    <Avatar className="w-[30px] h-[30px] bg-primary">
     {user.image ? (
      <AvatarImage src={getUserImagePath(user.image)} alt="Profile Picture" />
     ) : (
      <AvatarFallback className="bg-primary text-white text-xs">
       {firstInitial}
       {lastInitial}
      </AvatarFallback>
     )}
    </Avatar>
    <div className="flex flex-col  text-xs">
     <span>
      {user.firstName} {user.lastName}
     </span>
     <span>{Number(get(user, "credits", 0)).toFixed(2)} &euro;</span>
    </div>
   </Link>
  );
 }

 return (
  <div className="hidden md:flex items-center gap-2">
   <Link href="/login">Login</Link>
   <Button asChild variant={"outline"} className="rounded-3xl w-[130px] text-sm">
    <Link href="/register">Sign up</Link>
   </Button>
  </div>
 );
}
