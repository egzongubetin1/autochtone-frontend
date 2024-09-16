import CartSummary from "@/layout/cart/CartSummary";
import PaymentForm from "@/layout/cart/PaymentForm";

export default function Checkout() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl	 text-center font-bold">Checkout</h1>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-4 ">
          <div className="md:col-span-2 ">
            <CartSummary />
          </div>
          <div className="p-4 md:col-start-3 border flex flex-col rounded-md gap-4">
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
