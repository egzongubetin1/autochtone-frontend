import PublicRoute from "@/route/auth/PublicRoute";

export default function Layout({ children }) {
  return (
    <>
      <PublicRoute>{children}</PublicRoute>
    </>
  );
}
