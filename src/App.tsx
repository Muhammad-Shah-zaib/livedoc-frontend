import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import VerifyEmail from "./shared/pages/VerifyEmail";
import ForgotPassword from "./shared/pages/ForgotPassword";
import ResetPassword from "./shared/pages/ResetPassword";
import AppBootStrapGuard from "./guards/AppBootstrapGuard";
import PublicRouteGuard from "./guards/PublicRouteGuard";
import MasterLayout from "./shared/layouts/MasterLayout";
import DocumentDetail from "./components/documents/DocumentDetail";
import Dashboard from "./components/dashboard/Dashboard";
import SecondaryLayout from "./shared/layouts/SecondaryLayout";
import AboutPage from "./shared/pages/AboutUs";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { applyThemeInital } from "./store/theme/themeSlice";
import { Toaster } from "sonner";

function App() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  // get bodu element and apply the dark or no dark class
  const body = document.querySelector("body");
  useEffect(() => {
    if (body) {
      switch (mode) {
        case "light":
          body.classList.remove("dark");
          break;
        case "dark":
          body.classList.add("dark");
          break;
      }
    }
  }, [mode]);
  useEffect(() => {
    dispatch(applyThemeInital());
  }, []);

  return (
    <>
      <Routes>
        {/* NON PROTECTED ROUTES */}
        {/* REDIRECTION */}
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* AUTH ROUTES */}
        <Route path="/" element={<PublicRouteGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPassword />}
          />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route path="/" element={<AppBootStrapGuard />}>
          <Route element={<MasterLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<SecondaryLayout />}>
            <Route path="documents/:shareToken" element={<DocumentDetail />} />
          </Route>
        </Route>
      </Routes>

      <Toaster theme={mode} />
    </>
  );
}

export default App;
