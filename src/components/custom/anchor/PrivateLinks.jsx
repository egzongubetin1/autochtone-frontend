"use client";
import { useAppSelector } from "@/redux/hooks";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import LoginForm from "@/layout/auth/login/LoginForm";

export default function PrivateLinks({
  name,
  children,
  ...props
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <Dialog>
        <DialogTrigger {...props}>{name}</DialogTrigger>
        <DialogContent>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}
