"use client";
import { useAppSelector } from "@/redux/hooks";

export function CreditLabel() {
  const { user } = useAppSelector(
    (state) => state.auth
  );
  
  return (
    <>{parseFloat(user.credits).toFixed(2) || "0.00"}</>
  );
}
