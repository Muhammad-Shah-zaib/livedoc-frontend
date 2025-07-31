import { Outlet } from "react-router-dom";
import DocumentDetailHeader from "../components/Header/DocumentDetailHeader";
import SettingsDrawer from "../components/settings/SettingsDrawer";

const SecondaryLayout = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Header with responsive min-height - smaller than MasterLayout */}
      <div className="w-screen flex justify-center items-center p-4 min-h-[120px] sm:min-h-[100px] md:min-h-[80px] lg:min-h-[70px]">
        <div className="w-full max-w-7xl">
          <DocumentDetailHeader />
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

export default SecondaryLayout;
