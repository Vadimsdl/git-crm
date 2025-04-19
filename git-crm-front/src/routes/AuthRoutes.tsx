import { Routes } from "@/constants/routes";
import { AuthContext } from "@/context/AuthContext";
import AuthLayout from "@/layouts/AuthLayout";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {!isSignedIn ? (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      ) : (
        <Navigate to={Routes.DASHBOARD} />
      )}
    </>
  );
};

export default AuthRoute;
