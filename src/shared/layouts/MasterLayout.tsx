import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SettingsDrawer from "../components/settings/SettingsDrawer";
import { useAppDispatch } from "@/store/store";
import { setCurrentDocument } from "@/store/documents/documentSlice";

const MasterLayout = () => {
  const dispatch = useAppDispatch();

  dispatch(setCurrentDocument(null));
  return (
    <div className="w-screen h-screen grid grid-rows-6 md:grid-rows-8 mt-0 md:mt-4 xl:mt-0 xl:grid-rows-10 justify-center overflow-y-auto overflow-x-hidden">
      <div className="row-span-1 w-screen flex justify-center items-center p-4">
        <div className="w-full max-w-7xl px-8">
          <Header />
        </div>
      </div>
      <div className="row-span-5 sm:row-span-9 w-screen flex justify-center px-8">
        <div className="max-w-7xl w-full">
          <Outlet />
        </div>
        <SettingsDrawer />
      </div>
    </div>
  );
};

export default MasterLayout;
