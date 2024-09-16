import AuthLayout from "@/layout/auth/AuthLayout";
import ResetPasswordForm from "@/layout/auth/password/ResetPasswordForm";

export default async function ResetPassword({ params }) {
  return (
    <AuthLayout>
      <ResetPasswordForm token={params.token} />
    </AuthLayout>
  );
}
