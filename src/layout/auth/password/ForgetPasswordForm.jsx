"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { PASSWORD_RESET_VALIDATION } from "./validation";
import { useForgetPassword } from "./hooks";

export default function ForgotPasswordForm() {
  const queryClient = useQueryClient();

  const passwordMutation = useForgetPassword(async (data) => {
    toast({
      title: "Please check your email for further instructions!",
    });
  });

  return (
    <div className=" flex flex-col justify-center gap-5">
      <h1 className="text-4xl	font-bold	">Forgot Password?</h1>
      <p>Please enter your email address</p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={PASSWORD_RESET_VALIDATION}
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
            <InputWrapper error={errors.email && touched.email && errors.email}>
              <Field
                placeholder="Email"
                component={Input}
                type="text"
                name="email"
                onChange={handleChange}
              />
            </InputWrapper>

            <Button
              type="submit"
              disabled={isSubmitting || passwordMutation.isPending}
              variant={"secondary"}
            >
              Process
            </Button>
          </Form>
        )}
      </Formik>
      <div className="relative w-full items-center text-center">
        <Separator className="absolute top-3 " />
        <span className="relative bg-white z-10 px-2 text-sm">or</span>
      </div>
      <div className="text-center">
        Need an account?{" "}
        <Link href="register" className="border-b text-secondary font-semibold	">
          Create one
        </Link>
      </div>
    </div>
  );
}
