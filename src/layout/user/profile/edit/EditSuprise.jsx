"use client";
import InputWrapper from "@/components/custom/form/InputWrapper";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, useFormikContext } from "formik";

export default function EditSurprize() {
 const { values, errors, touched, handleChange, setFieldValue } = useFormikContext();

 return (
  <div className="flex flex-col gap-5">
   <InputWrapper error={errors.surpriseFullName && touched.surpriseFullName && errors.surpriseFullName}>
    <Field placeholder="Surprise Full Name" component={Input} type="text" name="surpriseFullName" onChange={handleChange} />
   </InputWrapper>
   <Select
    onValueChange={(value) => {
     setFieldValue("surpriseRelation", value);
    }}
    defaultValue={values.surpriseRelation}
   >
    <SelectTrigger>
     <SelectValue placeholder="Relation" />
    </SelectTrigger>
    <SelectContent>
     <SelectItem value="father">Father</SelectItem>
     <SelectItem value="mother">Mother</SelectItem>
     <SelectItem value="sibling">Sibling</SelectItem>
     <SelectItem value="others">Other</SelectItem>
    </SelectContent>
   </Select>

   <InputWrapper error={errors.suprisePhoneNumber && touched.suprisePhoneNumber && errors.suprisePhoneNumber}>
    <Field placeholder="Surprise Phone number" component={Input} type="text" name="suprisePhoneNumber" onChange={handleChange} />
   </InputWrapper>
  </div>
 );
}
