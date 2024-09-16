"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import PasswordInput from "@/components/custom/form/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { LOGIN_VALIDATION } from "./validation";
import { useLoginMutation } from "./hooks";
import { toast } from "@/components/ui/use-toast";
import { get } from "lodash";
import { LOCAL_STORAGE_TOKEN_NAME } from "@/data/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PrivacyPolicy from "@/components/custom/form/PrivacyPolicy";

export default function LoginForm() {
  const queryClient = useQueryClient();

  const loginMutation = useLoginMutation(async (data) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, get(data, "token", ""));
    await queryClient.invalidateQueries({ queryKey: ["token/verifyToken"] });
    toast({
      title: "Welcome back! You have successfully logged in",
    });
  });

  return (
    <div className=" flex flex-col justify-center gap-5">
      <h1 className="text-4xl	font-bold	">Login</h1>
      <p>Please login to continue to your account.</p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LOGIN_VALIDATION}
        onSubmit={async (values, { setSubmitting }) => {
          await loginMutation.mutateAsync(values);
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
            <InputWrapper
              error={errors.password && touched.password && errors.password}
            >
              <Field
                placeholder="Password"
                component={PasswordInput}
                type="password"
                name="password"
                onChange={handleChange}
              />
            </InputWrapper>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me logged in
              </label>
            </div> */}
            <PrivacyPolicy />
            <Link
              href="/auth/password"
              className="flex items-center space-x-2 text-xs"
            >
              Forgot Password?
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              variant={"secondary"}
            >
              Sign in
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
