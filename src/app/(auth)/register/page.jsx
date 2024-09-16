import { Separator } from "@/components/ui/separator";
import AuthWrapper from "@/layout/auth/AuthLayout";
import RegisterForm from "@/layout/auth/register/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <AuthWrapper>
      <div className="pl-0 md:pl-[50px] flex flex-col justify-center gap-5">
        <h1 className="text-4xl	font-bold	">Sign Up</h1>
        <p>Sign up to enjoy the feature of Revolutie</p>
        <RegisterForm />
        <div className="relative w-full items-center text-center">
          <Separator className="absolute top-3 " />
          <span className="relative bg-white z-10 px-2 text-sm">or</span>
        </div>
        <div className="text-center">
          Already have an account?
          <Link href="login" className="border-b text-secondary font-semibold	">
            Sign in
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}
