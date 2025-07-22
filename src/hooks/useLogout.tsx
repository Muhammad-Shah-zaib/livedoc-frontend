import { logoutThunk } from "@/store/auth/authThunk";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  return logout;
}
