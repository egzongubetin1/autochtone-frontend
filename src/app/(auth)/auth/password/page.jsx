import AuthLayout from "@/layout/auth/AuthLayout";
import LoginForm from "@/layout/auth/login/LoginForm";
import ForgotPasswordForm from "@/layout/auth/password/ForgetPasswordForm";

export default function ForgetPassword() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
