"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import PasswordInput from "@/components/custom/form/PasswordInput";
import { Input } from "@/components/ui/input";
import { Field, useFormikContext } from "formik";

export default function EditContactForm() {
  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <div className="flex flex-col gap-5">
      <InputWrapper error={errors.firstName && touched.firstName && errors.firstName}>
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
          placeholder="Last name"
          component={Input}
          type="text"
          name="lastName"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper error={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}>
        <Field
          placeholder="Phone Number"
          component={Input}
          type="text"
          name="phoneNumber"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper error={errors.email && touched.email && errors.email}>
        <Field
          placeholder="Email"
          component={Input}
          type="text"
          name="email"
          onChange={handleChange}
          disabled={true}
        />
      </InputWrapper>
    </div>
  );
}
