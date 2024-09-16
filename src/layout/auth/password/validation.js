import * as Yup from "yup";

export const PASSWORD_RESET_VALIDATION = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

export const PASSWORD_VALIDATION = Yup.object().shape({
  password: Yup.string()
    .required("Password is a required field")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const CHANGE_PASSWORD_VALIDATION = Yup.object().shape({
  password: Yup.string()
    .required("Password is a required field")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  newPassword: Yup.string()
    .required("Password is a required field")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});
