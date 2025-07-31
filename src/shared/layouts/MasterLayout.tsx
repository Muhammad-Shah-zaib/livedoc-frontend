import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SettingsDrawer from "../components/settings/SettingsDrawer";
import { useAppDispatch } from "@/store/store";
import { setCurrentDocument } from "@/store/documents/documentSlice";

const MasterLayout = () => {
  const dispatch = useAppDispatch();

  dispatch(setCurrentDocument(null));
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Header with responsive min-height */}
      <div className="w-screen flex justify-center items-center p-4 min-h-[200px] sm:min-h-[120px] md:min-h-[100px] lg:min-h-[80px]">
        <div className="w-full max-w-7xl px-8">
          <Header />
        </div>
      </div>

      {/* Main content area - takes remaining space */}
      <div className="flex-1 w-screen flex justify-center px-8 pb-8">
        <div className="max-w-7xl w-full">
          <Outlet />
        </div>
        <SettingsDrawer />
      </div>
    </div>
  );
};

export default MasterLayout;
