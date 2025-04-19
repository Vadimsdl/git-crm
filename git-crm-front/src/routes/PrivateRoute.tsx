import { Routes } from "@/constants/routes";
import { AuthContext } from "@/context/AuthContext";
import AccountLayout from "@/layouts/AccountLayout";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {isSignedIn ? (
        <AccountLayout>
          <Outlet />
        </AccountLayout>
      ) : (
        <Navigate to={Routes.SIGNIN} />
      )}
    </>
  );
};

export default PrivateRoute;
