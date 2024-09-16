import PrivateRoute from "@/route/auth/PrivateRoute";

export default function Layout({ children }) {
  return (
    <>
      <PrivateRoute>{children}</PrivateRoute>
    </>
  );
}
