"use client";
import Loading from "@/components/custom/loading";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const { fetchStatus, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/user/credits`);
    }
  }, [isAuthenticated]);

  if (fetchStatus === "pending" || isAuthenticated)
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );

  return <>{children}</>;
};

export default PublicRoute;
