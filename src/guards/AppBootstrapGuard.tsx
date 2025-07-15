import AppBootstrap from "@/shared/pages/AppBootstrap";
import { setGeneralError } from "@/store/auth/authSlice";
import { getUserProfileThunk, logoutThunk } from "@/store/auth/authThunk";
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

  useEffect(() => {
    if (!initialAuthChecked) {
      dispatch(getUserProfileThunk());
    }
    if (initialAuthChecked && !initialDocumentFetch) {
      dispatch(getDocumentsThunk());
    }
  }, [initialAuthChecked, dispatch]);

  useEffect(() => {
    if (initialAuthChecked && !isAuthenticated && !user) {
      dispatch(logoutThunk());
      dispatch(setGeneralError(null));
      navigate("/login");
    }
  }, [initialAuthChecked, isAuthenticated, user, navigate]);

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
