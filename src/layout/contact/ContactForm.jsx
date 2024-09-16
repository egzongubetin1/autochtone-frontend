"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useContactMutation } from "./hook";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactForm() {
  const contactMutation = useContactMutation();

  const CONTACT_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
    firstName: Yup.string()
      .required("Name is a required field")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    lastName: Yup.string()
      .required("Last Name is a required field")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    message: Yup.string().required("Message is a required field"),
  });

  useContactMutation;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      }}
      validationSchema={CONTACT_VALIDATION}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await contactMutation.mutateAsync(values);
          resetForm();
        } finally {
          setSubmitting(false);
          resetForm();
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
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <InputWrapper
              error={errors.firstName && touched.firstName && errors.firstName}
            >
              <Field
                placeholder="Name"
                component={Input}
                type="text"
                name="firstName"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper
              error={errors.lastName && touched.lastName && errors.lastName}
            >
              <Field
                placeholder="Last Name"
                component={Input}
                type="text"
                name="lastName"
                onChange={handleChange}
              />
            </InputWrapper>
          </div>
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
            error={
              errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
            }
          >
            <Field
              placeholder="Phone Number"
              component={Input}
              type="text"
              name="phoneNumber"
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper
            error={errors.message && touched.message && errors.message}
          >
            <Field
              placeholder="Your message here"
              component={Textarea}
              type="text"
              name="message"
              onChange={(e) => {
                setFieldValue("message", e.target.value);
              }}
            />
          </InputWrapper>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={true} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              You agree to our friendly privacy policy.
            </label>
          </div>
          <Button type="submit" disabled={isSubmitting} variant={"secondary"}>
            Send message
          </Button>
        </Form>
      )}
    </Formik>
  );
}
