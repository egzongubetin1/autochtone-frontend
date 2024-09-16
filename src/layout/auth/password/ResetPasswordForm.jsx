"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import { toast } from "@/components/ui/use-toast";
import { PASSWORD_VALIDATION } from "./validation";
import PasswordInput from "@/components/custom/form/PasswordInput";
import { useResetPassword } from "./hooks";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }) {
  const router = useRouter();

  const passwordMutation = useResetPassword(async (data) => {
    router.push("/login");
    toast({
      title: "Password changed successfully!",
    });
  });

  return (
    <div className=" flex flex-col justify-center gap-5">
      <h1 className="text-4xl font-bold">Reset Password</h1>
      <Formik
        initialValues={{ password: "", repeatPassword: "" }}
        validationSchema={PASSWORD_VALIDATION}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await passwordMutation.mutateAsync({ token: token, body: values });

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
                placeholder="Password"
                component={PasswordInput}
                type="password"
                name="password"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper
              error={
                errors.repeatPassword &&
                touched.repeatPassword &&
                errors.repeatPassword
              }
            >
              <Field
                placeholder="Repeat Password"
                component={PasswordInput}
                type="password"
                name="repeatPassword"
                onChange={handleChange}
              />
            </InputWrapper>
            <Button
              type="submit"
              disabled={isSubmitting || passwordMutation.isPending}
              variant={"secondary"}
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
