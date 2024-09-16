"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserService } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

export function CreditHistory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user/creditHistory"],
    queryFn: async ({ queryKey }) => {
      return await UserService.getCreditsHistory();
    },
    retry: false,
  });

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col text-center mt-10 gap-10">
      <h1 className="text-semibold text-2xl">Game Credit History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tickets</TableHead>
            <TableHead>Won</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {data.orders.map((order) => (
            <TableRow key={order.cartId} className="font-light">
              <TableCell>#{order.cartId}</TableCell>
              <TableCell>21/08/2024</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{parseFloat(order.credits).toFixed(2)}&euro;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
