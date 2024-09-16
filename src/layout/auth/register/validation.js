import * as Yup from "yup";

export const REGISTER_VALIDATION = Yup.object().shape({
 email: Yup.string().email("Invalid email address").required("Required"),
 password: Yup.string()
  .required("Password is a required field")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .min(8, "Password must be at least 8 characters"),
 repeatPassword: Yup.string()
  .oneOf([Yup.ref("password"), undefined], "Passwords must match")
  .required("Please confirm your password"),
 firstName: Yup.string()
  .required("Name is a required field")
  .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
 lastName: Yup.string()
  .required("Last name is a required field")
  .matches(/^[a-zA-Z\s]+$/, "Last Name can only contain letters and spaces"),
 dob: Yup.date().required("Date of birth is required").max(new Date(), "Date of birth cannot be in the future").typeError("Invalid date format"),
 phoneNumber: Yup.string().required("Required"),
});
