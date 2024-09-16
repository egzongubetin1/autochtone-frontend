"use client";
import { AvatarUpload } from "@/components/custom/form/AvatarUpload";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import EditContactForm from "./edit/EditContact";
import { Separator } from "@/components/ui/separator";
import EditBillingForm from "./edit/EditBilling";
import { useState } from "react";
import { UserService } from "@/services/UserService";
import { errorHandler } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import EditSurprize from "./edit/EditSuprise";
import { ChangePasswordForm } from "@/layout/auth/password/ChangePasswordForm";
import { Info } from "lucide-react";

export default function EditUserProfile() {
 const { user } = useAppSelector((state) => state.auth);
 const [image, setImage] = useState(null);

 const EDIT_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastName: Yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  phoneNumber: Yup.string()
   .required("Phone number is required")
   .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
  // address: Yup.string().required("Address is required"),
  // address2: Yup.string().nullable(), // Optional field
  // zip: Yup.string()
  //   .required("Zip code is required")
  //   .matches(/^[0-9]{5}$/, "Zip code must be exactly 5 digits"),
  // country: Yup.string().required("Country is required"),
  // city: Yup.string().required("City is required"),

  // surpriseFullName: Yup.string()
  //   .required("Full name is required")
  //   .min(2, "Full name must be at least 2 characters"),
  // suprisePhoneNumber: Yup.string()
  //   .required("Phone number is required")
  //   .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
  // surpriseRelation: Yup.string()
  //   .required("First name is required")
  //   .min(2, "First name must be at least 2 characters"),
 });

 const editMutation = useMutation({
  mutationKey: ["users/edit"],
  mutationFn: (data) => UserService.update(data),
  onSuccess: async (data) => {
   toast({
    title: "Data updated successfully",
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

 return (
  <Formik
   initialValues={{
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    address2: user.address2,
    zip: user.zip,
    country: user.country,
    city: user.city,
    surpriseFullName: user.surpriseFullName,
    suprisePhoneNumber: user.suprisePhoneNumber,
    surpriseRelation: user.surpriseRelation,
   }}
   validationSchema={EDIT_VALIDATION}
   onSubmit={async (values, { setSubmitting }) => {
    const modifiedValues = { ...values };

    delete modifiedValues.email;
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedValues));
    formData.append("file", image ? image : null);
    await editMutation.mutateAsync(formData);
   }}
  >
   {({ handleSubmit, isSubmitting, handleChange }) => (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
     <div className="flex flex-col md:flex-row justify-between w-full">
      <AvatarUpload setImage={setImage} image={image} user={user} />
      <div className="hidden md:flex gap-5">
       <Button type="button" disabled={isSubmitting} variant={"outline"}>
        Cancel
       </Button>
       <Button type="submit" disabled={isSubmitting} variant={"secondary"}>
        Save
       </Button>
      </div>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-40 gap-y-20">
      <div>
       <h1 className="font-semibold	text-2xl text-center	">Contact Info</h1>

       <Separator className="my-6" />
       <EditContactForm />
       <ChangePasswordForm />
      </div>
      <div>
       <h1 className="font-semibold	text-2xl	text-center">Billing Address</h1>
       <Separator className="my-6" />
       <EditBillingForm />
      </div>
      <div>
       {" "}
       <h1 className="font-semibold	text-2xl	text-center">Suprise Contact</h1>
       <div className="flex items-center justify-center gap-2 text-gray-400">
        <Info size={14} /> <p className="italic text-[12px] text-center py-4">Surprise contact is the person we will call if you are a winner!</p>
       </div>
       <Separator className="my-6" />
       <EditSurprize />
      </div>
     </div>
     <div className="grid grid-cols-2 md:hidden gap-5">
      <Button type="button" disabled={isSubmitting} variant={"outline"}>
       Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} variant={"secondary"}>
       Save
      </Button>
     </div>
    </Form>
   )}
  </Formik>
 );
}
