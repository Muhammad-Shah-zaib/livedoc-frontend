import { Outlet } from "react-router-dom";
import DocumentDetailHeader from "../components/Header/DocumentDetailHeader";
import SettingsDrawer from "../components/settings/SettingsDrawer";

const SecondaryLayout = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-10 justify-center overflow-y-auto overflow-x-hidden">
      <div className="row-span-1 w-screen flex justify-center items-center p-4">
        <div className="w-full max-w-7xl ">
          <DocumentDetailHeader />
        </div>
      </div>
      <div className="row-span-9 w-screen flex justify-center px-8">
        <div className="max-w-7xl w-full">
          <Outlet />
        </div>
        <SettingsDrawer />
      </div>
    </div>
  );
};

export default SecondaryLayout;
