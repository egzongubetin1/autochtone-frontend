import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AuthService } from "@/services/AuthService";
import { setFetchStatus, setUser } from "@/redux/features/auth/authSlice";


const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: ["token/verifyToken"],
    queryFn: async () => {
      const data = await AuthService.verifyToken();
      dispatch(setUser(data.user));
    },
    retry: false,
  });


  useEffect(() => {
    dispatch(setFetchStatus(isLoading ? "pending" : "finished"));
  }, [isLoading]);

  return <div>{children}</div>;
};

export default AuthWrapper;
