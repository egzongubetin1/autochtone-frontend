"use client";
import GameCard from "@/components/custom/card/GameCard";
import Playground from "@/components/custom/game/Playground";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { get, size, groupBy, map, isEmpty } from "lodash";
import Link from "next/link";
import { useState } from "react";

export default function GameWrapper() {
 const [activeItem, setActiveItem] = useState(null);
 const cartItems = useAppSelector((state) => state.cart);
 const items = get(cartItems, "cart", []);

 if (isEmpty(items)) return <h1>Empty Cart!</h1>;

 const groupedItems = map(
  groupBy(items, (item) => `${get(item, "Item.itemId")}-${item.competitionId}`),
  (items) => {
   const { price, title, subtitle, image, itemId } = get(items, "[0].Item");
   const quantity = items.length;
   const total = quantity * price;
   const competitionId = get(items, "[0].competitionId");

   const Items = items;

   return {
    itemId,
    competitionId,
    price,
    quantity,
    total,
    title,
    subtitle,
    image,
    Items,
   };
  }
 );

 return (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
   <div className="md:col-span-3 h-unset rounded-md relative rounded-[12px] overflow-hidden">
    <Playground activeItem={activeItem} setActiveItem={setActiveItem} />
   </div>
   <div className="relative flex flex-col gap-2  w-full h-[80vh] overflow-scroll">
    {size(items) > 0 &&
     groupedItems.map((item, index) => {
      return <GameCard activeItem={activeItem} setActiveItem={setActiveItem} item={item} key={`card-item-${index}`} />;
     })}
    <div className="bg-white pt-1 sticky bottom-0 flex flex-col items-center text-center w-full gap-2">
     <Button asChild variant={"secondary"} className="rounded-3xl w-full text-sm">
      <Link href="/checkout">Checkout</Link>
     </Button>
     <Link href="/competition" className="text-secondary underline text-center">
      Add More Tickets
     </Link>
    </div>
   </div>
  </div>
 );
}
