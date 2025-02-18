import { Navigate, Outlet } from "react-router";
import { useUser } from "../features/auth/hooks/useAuth";
import Loader from "./Loader";

const AuthLayout = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  if (user) return <Navigate to="/" />;
  else
    return (
      <>
        <Outlet />
      </>
    );
};

export default AuthLayout;
