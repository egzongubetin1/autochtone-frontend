"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import PasswordInput from "@/components/custom/form/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { REGISTER_VALIDATION } from "./validation";
import { useRegisterMutation } from "./hooks";
import PrivacyPolicy from "@/components/custom/form/PrivacyPolicy";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Info } from "lucide-react";

export default function RegisterForm() {
 const registerMutation = useRegisterMutation();
 const [value, onChange] = useState(new Date());

 return (
  <Formik
   initialValues={{
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    dob: undefined,
    subscribe: true,
    phoneNumber: "",
   }}
   validationSchema={REGISTER_VALIDATION}
   onSubmit={async (values, { setSubmitting, resetForm }) => {
    try {
     await registerMutation.mutateAsync(values);
     resetForm();
    } finally {
     setSubmitting(false);
    }
   }}
  >
   {({ errors, touched, handleSubmit, isSubmitting, values, handleChange, setFieldValue }) => (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
     <div className="flex items-center gap-2 text-gray-400">
      <Info size={14} /> <p className="italic text-[12px]"> Please make sure to use a legitimate name and last name!</p>
     </div>
     <div className="grid grid-cols-2 gap-2 w-full">
      <InputWrapper error={errors.firstName && touched.firstName && errors.firstName}>
       <Field placeholder="Name" component={Input} type="text" name="firstName" onChange={handleChange} />
      </InputWrapper>
      <InputWrapper error={errors.lastName && touched.lastName && errors.lastName}>
       <Field placeholder="Last Name" component={Input} type="text" name="lastName" onChange={handleChange} />
      </InputWrapper>
     </div>

     <InputWrapper error={errors.dob && touched.dob && errors.dob}>
      <div className="flex items-center gap-2">
       <p className=" text-[14px]"> Birth date</p>
      </div>
      <Field placeholder="Dob" component={Input} type="date" name="dob" onChange={handleChange} />
     </InputWrapper>
     <InputWrapper error={errors.email && touched.email && errors.email}>
      <Field placeholder="Email" component={Input} type="text" name="email" onChange={handleChange} />
     </InputWrapper>
     <InputWrapper error={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}>
      <Field placeholder="Phone number" component={Input} type="number" name="phoneNumber" onChange={handleChange} />
     </InputWrapper>
     <InputWrapper error={errors.password && touched.password && errors.password}>
      <Field placeholder="Password" component={PasswordInput} type="password" name="password" onChange={handleChange} />
     </InputWrapper>
     <InputWrapper error={errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}>
      <Field placeholder="Repeat Password" component={PasswordInput} type="password" name="repeatPassword" onChange={handleChange} />
     </InputWrapper>
     {/* <label
            htmlFor="terms"
            className="gap-2 flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Checkbox
              id="subscribe"
              name={"subscribe"}
              checked={values.subscribe}
              onChange={(value)=>{console.log("value", value)}}
            />
            Subscribe us
          </label> */}
     <div className="flex items-center space-x-2">
      <Checkbox
       id="terms"
       checked={values.subscribe}
       onClick={(e) => {
        let selectedValue = values.subscribe;
        setFieldValue("subscribe", !selectedValue);
       }}
      />
      <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
       Subscribe to our newsletter to receive updates, exclusive offers, and the latest news directly to your inbox
      </label>
     </div>

     <PrivacyPolicy />
     <Button type="submit" disabled={isSubmitting || registerMutation.isPending} variant={"secondary"}>
      Register Now
     </Button>
    </Form>
   )}
  </Formik>
 );
}
