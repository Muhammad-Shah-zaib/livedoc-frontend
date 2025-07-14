import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import VerifyEmail from "./shared/pages/VerifyEmail";
import ForgotPassword from "./shared/pages/ForgotPassword";
import ResetPassword from "./shared/pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        {/* NON PROTECTED ROUTES */}
        {/* REDIRECTION */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
      </Routes>

      {/* PROTEXTED ROUTES */}
    </>
  );
}

export default App;
