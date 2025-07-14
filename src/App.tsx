import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import VerifyEmail from "./shared/pages/VerifyEmail";

function App() {
  return (
    <>
      {/* NON PROTECTED ROUTES */}
      <Routes>
        {/* REDIRECTION */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/verify-email" element={<VerifyEmail />} />
      </Routes>

      {/* PROTEXTED ROUTES */}
    </>
  );
}

export default App;
