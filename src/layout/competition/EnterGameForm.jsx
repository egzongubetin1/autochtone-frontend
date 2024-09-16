"use client";
import AddToCart from "@/components/custom/cart/AddCart";
import QuantityPicker from "@/components/custom/form/QuantityPicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { API_RESPONSE } from "@/data/constants";
import { QUICK_PRICE_SELECT } from "@/data/sys_constants";
import { addToCartAsync } from "@/redux/features/cart/cartThunks";
import { useAppSelector } from "@/redux/hooks";
import { getImagePath } from "@/utils/helpers";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Form, Formik } from "formik";
import { get, multiply } from "lodash";
import { CornerDownRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EnterGameForm({ item, label = "Enter now", competitionId, CompetitionItemId }) {
 const dispatch = useDispatch();
 const { isAuthenticated } = useAppSelector((state) => state.auth);
 const { status } = useAppSelector((state) => state.cart);
 const [isOpen, setIsOpen] = useState(false);

 if (!isAuthenticated) return <AddToCart item={item} label={label} setIsOpen={setIsOpen} qty={1} />;

 const image = getImagePath(get(item, "image"));

 function redirectToGame(qty) {
  const data = {
   ...item,
   quantity: qty,
   competitionId,
   CompetitionItemId,
  };

  dispatch(addToCartAsync(data))
   .unwrap()
   .then((result) => {
    window.location.href = "/game";
   })
   .catch((error) => {});
 }

 const isSaving = status === API_RESPONSE.loading;

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogTrigger className="w-full">
    <Button variant={"secondary"} className="flex gap-2 items-center w-full" type="button" asChild>
     <div className="flex">
      {label == "Enter now" && <CornerDownRight size={18} />}
      {label}
      {label !== "Enter now" && <CornerDownRight />}
     </div>
    </Button>
   </DialogTrigger>
   <DialogContent className="max-w-[90%] md:w-[470px] max-h-[85%] overflow-y-auto">
    <Formik
     initialValues={{
      id: null,
      qty: 1,
      total: 0,
     }}
     onSubmit={async (values, { setSubmitting }) => {
      redirectToGame(values.qty);
     }}
    >
     {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
      <Form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
       <h1 className="text-2xl font-semibold	 text-center">Buy Tickets</h1>
       <div className="flex flex-col gap-2 mt-5 w-full">
        <div className=" h-[130px] w-full">
         <div className=" overflow-hidden relative h-[150px]">
          <Image src={image} alt={`${item.title} logo`} fill className="object-contain" />
         </div>
        </div>
        <div className="flex justify-between">
         <h1 className="text-xl	font-medium	">{item.title}</h1>
         <span className="text-lg	text-gray-500">{item.subtitle}</span>
        </div>
        <div className="flex justify-between">
         <h1 className="text-xl	font-medium	">Price</h1>
         <p className="font-bold text-base	text-xl">
          {item.price} &euro;
          <span className="text-lg text-gray-500 font-light	text-xs">/per ticket</span>
         </p>
        </div>
       </div>
       <div className="flex flex-col gap-5">
        <h1 className="text-2xl	font-semibold	 text-center">Quantity</h1>
        <QuantityPicker
         changeValue={(value) => {
          setFieldValue("qty", value);
         }}
         value={values.qty}
        />
       </div>
       <div className="flex flex-col gap-5 w-full">
        <h1 className="text-2xl font-semibold	 text-center">Quick Select</h1>
        <div className="flex grid-cols-4 gap-5 w-full">
         {QUICK_PRICE_SELECT.map((value, index) => {
          return (
           <div
            className={`cursor-pointer border flex flex-col text-center p-2 rounded-md w-full text-xs md:text-sm ${
             values.qty == value && "border-primary text-primary"
            }`}
            onClick={() => {
             setFieldValue("qty", value);
            }}
            key={`select-price-${index}`}
           >
            {value}
            <span>Tickets</span>
           </div>
          );
         })}
        </div>
       </div>

       <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold	 text-center">Total Price</h1>
        <div className="border p-2 rounded-md text-center">
         {multiply(parseFloat(get(item, "price", "0")), values.qty).toFixed(2)}
         &euro;
        </div>
       </div>
       <div className="grid grid-cols-1 gap-5 w-full">
        {/* <AddToCart
                  item={item}
                  qty={values.qty}
                  setIsOpen={(status) => setIsOpen(false)}
                  className={
                    "bg-white border text-gray-500 gap-2 hover:bg-white hover:border-primary hover:text-primary"
                  }
                  disabled={isSaving}
                /> */}
        <Button type="submit" disabled={isSubmitting || isSaving}>
         Proceed to Play
        </Button>
       </div>
      </Form>
     )}
    </Formik>
   </DialogContent>
  </Dialog>
 );
}
