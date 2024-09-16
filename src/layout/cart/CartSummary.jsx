"use client";
import Loading from "@/components/custom/loading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_RESPONSE } from "@/data/constants";
import { removeItemsAsync } from "@/redux/features/cart/cartThunks";
import { useAppSelector } from "@/redux/hooks";
import { getImagePath } from "@/utils/helpers";
import { get, size, groupBy, map } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CartSummary() {
  const dispatch = useDispatch();
  const { status, cart } = useAppSelector((state) => state.cart);
  const [isDeleting, setIsDeleting] = useState(-1);

  const items = cart || [];

  const groupedItems = map(
    groupBy(
      items,
      (item) => `${get(item, "Item.itemId")}-${item.competitionId}`
    ),
    (items) => {
      const { price, title, subtitle, itemId } = get(items, "[0].Item");
      const quantity = items.length;
      const total = (quantity * price).toFixed(2);
      const competitionId = get(items, "[0].competitionId");
      const image = getImagePath(get(items, "[0].Item.image"));

      return {
        image,
        itemId,
        competitionId,
        price,
        quantity,
        total,
        title,
        subtitle,
      };
    }
  );
  function removeFromCart(competitionId, itemId) {
    dispatch(removeItemsAsync({ competitionId, itemId }));
  }
  const isUpdating = status === API_RESPONSE.loading;

  return (
    <>
      <Table className="hidden md:table">
        <TableHeader>
          <TableRow>
            <TableHead>Your Entries</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {size(items) > 0 ? (
            groupedItems.map((item, index) => {
              const isCurrentRowBeingDeleted =
                isUpdating && isDeleting === index;
              return (
                <TableRow
                  key={`cart-itme-${index}-${item.itemId}`}
                  className={`font-light ${
                    isCurrentRowBeingDeleted && "opacity-25"
                  }`}
                >
                  <TableCell>
                    <div className="items-center flex  gap-2">
                      <div className="relative w-[120px] h-[70px]  rounded-md">
                        <Image
                          src={item.image}
                          alt="car"
                          fill
                          className="rounded-md object-contain"
                        />
                      </div>
                      <span>{item.title}</span>
                      <span>{item.subtitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.total} &euro;</TableCell>
                  <TableCell
                    className="  text-red-500 font-bold cursor-pointer"
                    onClick={() => {
                      if (status !== API_RESPONSE.loading) {
                        removeFromCart(item.competitionId, item.itemId);
                        setIsDeleting(index);
                      }
                    }}
                  >
                    {isCurrentRowBeingDeleted ? (
                      <div className="flex justify-start">
                        <Loading />
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell> You do not have anything in your cart!</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="md:hidden flex flex-col gap-10">
        {size(items) > 0 ? (
          groupedItems.map((item, index) => {
            const isCurrentRowBeingDeleted = isUpdating && isDeleting === index;
            return (
              <div className="flex flex-col gap-2" key={`quantity-${item.itemId}`}>
                <div className="flex justify-between">
                  <span className="bg-gray-100 p-2 rounded-md">Your Entries</span>
                  <span>
                    {item.title} {item.subtitle}
                  </span>
                </div>
                <Separator/>
                <div className="flex justify-between">
                  <span className="bg-gray-100 p-2 rounded-md">Ticket QTY</span>
                  <span>{item.quantity}</span>
                </div>
                <Separator/>
              </div>
            );
          })
        ) : (
          <p>You do not have anything in your cart!</p>
        )}
      </div>
    </>
  );
}
