"use client";

import Loading from "@/components/custom/loading";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { fetchStatus, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (fetchStatus === "finished" && !isAuthenticated) {
      router.push("/login");
    }
  }, [fetchStatus, isAuthenticated, router]);

  if (fetchStatus === "pending") {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default PrivateRoute;
