import { useAppSelector } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouteGuard = () => {
  const { isAuthenticated, user, initialAuthChecked } = useAppSelector(
    (state) => state.auth
  );

  if (!initialAuthChecked || (isAuthenticated && user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRouteGuard;
