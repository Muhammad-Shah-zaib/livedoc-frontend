import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import VerifyEmail from "./shared/pages/VerifyEmail";
import ForgotPassword from "./shared/pages/ForgotPassword";
import ResetPassword from "./shared/pages/ResetPassword";
import AppBootStrapGuard from "./guards/AppBootstrapGuard";
import PublicRouteGuard from "./guards/PublicRouteGuard";
import MasterLayout from "./shared/layouts/MasterLayout";

function App() {
  return (
    <>
      <Routes>
        {/* NON PROTECTED ROUTES */}
        {/* REDIRECTION */}
        <Route path="/" element={<Navigate to="/login" replace />} />
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
          <Route path="dashboard" element={<MasterLayout />} />
        </Route>
      </Routes>

      {/* PROTEXTED ROUTES */}
    </>
  );
}

export default App;
