"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SubscribeService } from "@/services/SubscribeService";
import { errorHandler } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { ArrowRight } from "lucide-react";
import * as Yup from "yup";

export default function Subscribe({ isFooterSubscription = true }) {
  const subscribeMutation = useMutation({
    mutationKey: ["users/subsribe"],
    mutationFn: (data) => SubscribeService.subscribe(data),
    onSuccess: async () => {
      toast({
        variant: "success",
        title: "Subscribed successfully",
      });
    },
    onError: (error) => {
      const message = errorHandler(error);
      toast({
        variant: "destructive",
        title: "Incorrect data! Please try again",
        description: message,
      });
    },
  });

  const SUBSCRIBE_VALIDATION = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={SUBSCRIBE_VALIDATION}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await subscribeMutation.mutateAsync(values);
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
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
         {isFooterSubscription &&  <p>Subscribe</p>}
          <div className={`relative text-black ${!isFooterSubscription && 'flex gap-5 w-full md:w-[400px] m-auto'}`}>
            <InputWrapper error={errors.email && touched.email && errors.email}>
              <Field
                placeholder="Get product updates"
                component={Input}
                type="text"
                name="email"
                onChange={handleChange}
                className={`text-blue-700	${!isFooterSubscription && 'w-full md:w-[300px]'}`}
              />
            </InputWrapper>

            {isFooterSubscription && (
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"secondary"}
                className="rounded-none rounded-tr-sm	rounded-br-sm	 absolute top-0 right-0 bg-[#478EFF]"
              >
                <ArrowRight />
              </Button>
            )}
            {!isFooterSubscription && (
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"secondary"}
                className="rounded-me   top-0 -right-20"
              >
                Subscribe
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
