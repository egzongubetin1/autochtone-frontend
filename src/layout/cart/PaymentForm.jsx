"use client";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import PaymentOption from "@/components/custom/payment/PaymentOption";
import CreditAlert from "@/components/custom/payment/CreditAlert";
import { useAppSelector } from "@/redux/hooks";
import { get } from "lodash";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentForm=() => {
  const { cart, total } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const total_price = total;
  const total_credits = get(user, "credits", 0);

  const PaymentSchema = Yup.object().shape({
    payment_method: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one payment method")
      .required("Please select a payment method"),
  });

  const hasUnMarked = useMemo(() => {
    return cart.some(item => item.isMarked);
  }, [cart])

  return (
    <Formik
      initialValues={{ payment_method:[] }}
      validationSchema={PaymentSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-6">
          <div className="col-start-3 flex flex-col rounded-md gap-4">
            <PaymentOption
              name="payment_method"
              value="credit_card"
              label="Credit Card"
              description="You will be redirected to the PayPal website after submitting your order"
              icons={[
                {
                  src: "/assets/icons/mastercard.svg",
                  alt: "MasterCard",
                  width: 30,
                  height: 30,
                },
                {
                  src: "/assets/icons/visa.svg",
                  alt: "Visa",
                  width: 65,
                  height: 65,
                },
              ]}
              onChange={() => {
                setFieldValue("payment_method", ["credit_card"]);
              }}
            />
            <PaymentOption
              name="payment_method"
              value="game_credit"
              label="Game Credit"
              description="You will be redirected to the PayPal website after submitting your order"
              icons={[
                {
                  src: "/assets/icons/blue_key.svg",
                  alt: "Blue Key",
                  width: 30,
                  height: 30,
                },
              ]}
              onChange={(value) => {
                if (!value) {
                  setFieldValue("payment_method", []);
                  return;
                }
                if (total_credits < total_price) {
                  setFieldValue("payment_method", [
                    "game_credit",
                    "credit_card",
                  ]);
                } else {
                  setFieldValue("payment_method", ["game_credit"]);
                }
              }}
            />
          </div>

          {values.payment_method.includes("game_credit") &&
            total_credits < total_price && <CreditAlert />}

          <div className="flex gap-4">
            <div className="flex items-center justify-center min-w-8 h-8 rounded-full p-2 bg-blue-50">
              <Lock size={12} color="blue" />
            </div>
            <p className="text-sm text-light text-gray-500">
              We protect your payment information using encryption to provide
              bank-level security.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <Button asChild variant={"outline"} className="rounded-xl text-sm">
              <Link href={`/competition/`} className=" gap-2 flex py-0">
                <ArrowLeft size={20} />
                Back
              </Link>
            </Button>
            {!hasUnMarked?(
              <Button asChild variant={"secondary"} className="rounded-xl text-sm">
                <Link href={`/game`} className=" gap-2 flex py-0">
                  Proceed to play
                  <ArrowRight size={20} />
                </Link>
              </Button>
            ):(
              <Button
                type={"submit"}
                variant={"secondary"}
                className="gap-2 rounded-xl text-sm"
              >
                Checkout
                <ArrowRight size={20} />
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
