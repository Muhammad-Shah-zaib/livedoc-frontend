import useNotificationSocket from "@/hooks/useNotificationSocket";
import AppBootstrap from "@/shared/pages/AppBootstrap";
import { getAllUsersThunk, getUserProfileThunk } from "@/store/auth/authThunk";
import {
  getAllDocumentAccessThunk,
  getDocumentsThunk,
} from "@/store/documents/documentThunk";
import { getNotificationsThunk } from "@/store/notification/notificationThunk";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";

const AppBootStrapGuard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasBootstrapped = useRef(false);

  const { isAuthenticated, user, initialAuthChecked } = useAppSelector(
    (state) => state.auth
  );
  const { initialDocumentFetch, isAppInitialized } = useAppSelector(
    (state) => state.documents
  );

  useNotificationSocket();

  useEffect(() => {
    if (hasBootstrapped.current) return;

    if (!initialAuthChecked) {
      dispatch(getUserProfileThunk());
    }

    if (initialAuthChecked) {
      if (!isAuthenticated && !user) {
        navigate("/login", { replace: true });
      }

      if (isAuthenticated && !initialDocumentFetch) {
        dispatch(getDocumentsThunk());
        dispatch(getNotificationsThunk());
        dispatch(getAllDocumentAccessThunk());
        dispatch(getAllUsersThunk());
      }

      hasBootstrapped.current = true;
    }
  }, [initialAuthChecked, isAuthenticated, user]);

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
