"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Input } from "@/components/ui/input";
import { Field, useFormikContext } from "formik";

export default function EditBillingForm() {
  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <div className="flex flex-col gap-5">
      <InputWrapper error={errors.country && touched.country && errors.country}>
        <Field
          placeholder="Country"
          component={Input}
          type="text"
          name="country"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper error={errors.address && touched.address && errors.address}>
        <Field
          placeholder="Address"
          component={Input}
          type="text"
          name="address"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper
        error={errors.address2 && touched.address2 && errors.address2}
      >
        <Field
          placeholder="Other Address"
          component={Input}
          type="text"
          name="address2"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper error={errors.city && touched.city && errors.city}>
        <Field
          placeholder="Town"
          component={Input}
          type="text"
          name="city"
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper error={errors.zip && touched.zip && errors.zip}>
        <Field
          placeholder="State / Zip Code"
          component={Input}
          type="text"
          name="zip"
          onChange={handleChange}
        />
      </InputWrapper>
    </div>
  );
}
