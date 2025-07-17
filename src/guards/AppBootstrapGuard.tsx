import useNotificationSocket from "@/hooks/useNotificationSocket";
import AppBootstrap from "@/shared/pages/AppBootstrap";
import { getUserProfileThunk } from "@/store/auth/authThunk";
import { getDocumentsThunk } from "@/store/documents/documentThunk";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AppBootStrapGuard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, initialAuthChecked } = useAppSelector(
    (state) => state.auth
  );
  const { initialDocumentFetch, isAppInitialized } = useAppSelector(
    (state) => state.documents
  );

  useNotificationSocket();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/login");
    }
    if (!initialAuthChecked) {
      dispatch(getUserProfileThunk());
    }
    if (initialAuthChecked && isAuthenticated && !initialDocumentFetch) {
      dispatch(getDocumentsThunk());
    }
  }, [initialAuthChecked, dispatch]);

  if (!isAppInitialized) {
    return (
      <>
        <AppBootstrap />
      </>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppBootStrapGuard;
