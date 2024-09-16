"use client";
import CompetitionItemCard from "@/components/custom/card/CompetitionItemCard";
import Loading from "@/components/custom/loading";
import { useAppSelector } from "@/redux/hooks";
import { size } from "lodash";

export default function WishlistList() {
 const { wishlistItems, loading } = useAppSelector((state) => state.wishlist);

 if (loading)
  return (
   <div>
    <Loading />
   </div>
  );

 return (
  <div className="flex flex-col gap-5">
   <h1 className="text-2xl text-primary font-bold">Wishlist</h1>
   <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
    {size(wishlistItems) > 0 ? (
     wishlistItems.map((data, index) => {
      return <CompetitionItemCard item={data.Item} key={`car-card-${data.itemId}`} />;
     })
    ) : (
     <h1>No item found!</h1>
    )}
   </div>
  </div>
 );
}
