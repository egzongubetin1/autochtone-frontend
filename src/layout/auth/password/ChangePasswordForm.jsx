"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CHANGE_PASSWORD_VALIDATION } from "./validation";
import { Field, Form, Formik } from "formik";
import InputWrapper from "@/components/custom/form/InputWrapper";
import PasswordInput from "@/components/custom/form/PasswordInput";
import { useChangePassword } from "./hooks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {  SquarePen } from "lucide-react";

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const passwordMutation = useChangePassword(async (data) => {
    setOpen(false);
    toast({
      title: "Password changed successfully!",
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative w-full mt-5">
        <Input
          type="password"
          value={"Lorem Ipsum"}
          disabled={false}
          className={"cursor-pointer"}
        />
        <SquarePen
          className="absolute top-0 right-5 top-[30%] text-primary"
          size={15}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Please enter new password</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={CHANGE_PASSWORD_VALIDATION}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await passwordMutation.mutateAsync(values);

              resetForm();
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            values,
            handleChange,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              <InputWrapper
                error={errors.password && touched.password && errors.password}
              >
                <Field
                  placeholder="Current Password"
                  component={PasswordInput}
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </InputWrapper>
              <InputWrapper
                error={
                  errors.newPassword &&
                  touched.newPassword &&
                  errors.newPassword
                }
              >
                <Field
                  placeholder="Password"
                  component={PasswordInput}
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                />
              </InputWrapper>
              <InputWrapper
                error={
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword
                }
              >
                <Field
                  placeholder="Repeat Password"
                  component={PasswordInput}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </InputWrapper>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"secondary"}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
