"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import PrivateLinks from "../anchor/PrivateLinks";
import { addToCartAsync } from "@/redux/features/cart/cartThunks";
import { useAppSelector } from "@/redux/hooks";
import { API_RESPONSE } from "@/data/constants";
import { toast } from "../../ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { get } from "lodash";

export default function AddToCart({ item, qty = 1, label = "Add To Cart", setIsOpen, ...props }) {
 const dispatch = useDispatch();

 const { status } = useAppSelector((state) => state.cart);

 const competitionId = get(item, "Competitions[0].competitionId");
 const competionItemId = get(item, "Competitions[0].CompetitionItem.competitionItemId");

 function handleAddToCartClick() {
  const data = { ...item, quantity: qty, competitionId, competionItemId };

  dispatch(addToCartAsync(data))
   .unwrap()
   .then((result) => {
    setIsOpen(false);
    toast({
     variant: "success",
     title: "Added to cart successfully!",
     description: "The item has been added to your cart.",
     action: <Link href="/game">Play!</Link>,
    });
   })
   .catch((error) => {
    console.error("Failed to add item to cart:", error);
   });
 }

 const isLoading = status === API_RESPONSE.loading;

 return (
  <PrivateLinks
   name={
    <div className="flex items-center gap-2 justify-center">
     <ShoppingCart size={18} color={"white"} />
     {label}
    </div>
   }
   className={
    "bg-secondary text-white hover:bg-primary w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
   }
  >
   <Button
    variant={"secondary"}
    className="flex gap-2 items-center w-full "
    onClick={handleAddToCartClick}
    type="button"
    disabled={isLoading}
    {...props}
   >
    <ShoppingCart size={18} color={"white"} />
    {label}
   </Button>
  </PrivateLinks>
 );
}
