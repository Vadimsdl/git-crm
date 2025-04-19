import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Routes } from "./constants/routes";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Routes.SIGNIN);
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
