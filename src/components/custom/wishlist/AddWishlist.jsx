"use client";
import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import PrivateLinks from "../anchor/PrivateLinks";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/redux/features/wishlist/wishlistThunks";
import { get } from "lodash";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import Loading from "../loading";

export default function AddWishlist({ item, customStyle='' }) {
  const dispatch = useDispatch();
  const { wishlistItems, loading } = useAppSelector((state) => state.wishlist);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const competitionItemId = get(
    item,
    "Competitions[0].CompetitionItem.competitionItemId"
  );

  const wishItem = wishlistItems.find((wishItem) => {
    const wishItemCompetitionItemId = get(wishItem, "competitionItemId");
    return wishItemCompetitionItemId === competitionItemId;
  });

  const isInWishlist = !!wishItem;

  function handleWishlist() {
    const wishlistBody = {
      itemId: item.itemId,
      competitionId: get(item, "Competitions[0].CompetitionItem.competitionId"),
      competitionItemId: competitionItemId,
    };

    if (!isInWishlist && !isItemLoading) {
      setIsItemLoading(true);
      dispatch(addToWishlist(wishlistBody)).then(() => {
        setIsItemLoading(false);
      });
    } else if (isInWishlist && !isItemLoading) {
      setIsItemLoading(true);
      dispatch(deleteFromWishlist(wishItem.wishlistId)).then(() => {
        setIsItemLoading(false);
      });
    }
  }
  return (
    <PrivateLinks name={<Heart className={`p-0 ${customStyle}`}/>}>
      <Button
        variant={"ghost"}
        onClick={handleWishlist}
        disabled={isItemLoading}
        className={"p-0 hover:bg-transparent"}
      >
        {isItemLoading ? (
          <Loading />
        ) : (
          <>
            <Heart color={isInWishlist ? "red" : "gray"} className={`p-0 ${customStyle}`}/>
          </>
        )}
      </Button>
    </PrivateLinks>
  );
}
