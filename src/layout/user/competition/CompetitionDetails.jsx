"use client";
import { UserService } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { groupBy } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReadOnlyResults } from "@/components/custom/game/ReadOnlyResults";
import dayjs from "dayjs";

export function CompetitionsDetails({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`user/competitionsdetails-${id}`],
    queryFn: async ({ queryKey }) => {
      return await UserService.getCompetitionDetail(id);
    },
    retry: false,
  });

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;

  const totalItemsLength = data.orders.reduce((acc, obj) => acc + obj.CartItems.length, 0);
  const totalPrice = data.orders.reduce((acc, obj) => acc + obj.total, 0);

  const points = data.orders.flatMap(item => item.CartItems);
  const groupedData = groupBy(points, 'itemId');

  const prices = Object.keys(groupedData).map(itemId => {
    const items = groupedData[itemId];
    return {
      itemId: itemId,
      title: items[0].Item.title,
      price: items[0].price,
      count: items.length
    };
  });

  return (
    <>
      <ReadOnlyResults
        showWinner={true}
        orders={data.orders}
        competition={data.competition}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Reference</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Ticket QTY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map(order => (
            <TableRow key={order.cartId}>
              <TableCell>#{order.cartId}</TableCell>
              <TableCell>{dayjs(order.paidAt).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{dayjs(order.paidAt).format("HH:mm")}</TableCell>
              <TableCell>{order.CartItems.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prize</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {prices.map(price => (
            <TableRow key={price.itemId}>
              <TableCell>{price.title}</TableCell>
              <TableCell>{price.count}</TableCell>
              <TableCell>{price.price} &euro;</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <div className="w-[400px] flex flex-col gap-5  text-center">
          <h1 className="text-2xl	text-right">Whole Order Summary</h1>
          <div className=" flex flex-col gap-5">
            <div className="grid grid-cols-2 ">
              <span className="text-right">All Ticket in Order</span>{" "}
              <span className="text-right">{totalItemsLength}</span>
            </div>
            <div className="grid grid-cols-2 font-bold">
              <span className="text-right">Total</span>{" "}
              <span className="text-right">{totalPrice}&euro;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
