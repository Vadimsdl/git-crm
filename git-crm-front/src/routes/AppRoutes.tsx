import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Routes as routes } from "@/constants/routes";
import AuthRoute from "./AuthRoutes";

const Page404 = lazy(() => import("../pages/404"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SignUp = lazy(() => import("../pages/SignUp"));

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthRoute />}>
      <Route index path={routes.SIGNIN} element={<SignIn />} />
      <Route path={routes.SIGNUP} element={<SignUp />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path={routes.DASHBOARD} element={<Dashboard />} />
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default AppRoutes;
