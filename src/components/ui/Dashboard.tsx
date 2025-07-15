import { logoutThunk } from "@/store/auth/authThunk";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen gap-4">
      <button
        className="px-4 py-2 bg-sky-500 shadow-lg shadow-slate-800 font-mono hover:bg-sky-600 font-bold text-white rounded-md transition-all duration-300 ease-in-out"
        onClick={handleClick}
      >
        logout
      </button>
    </div>
  );
}

export default Dashboard;
