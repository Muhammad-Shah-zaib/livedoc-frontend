import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MasterLayout = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-10 justify-center overflow-y-auto overflow-x-hidden">
      <div className="row-span-1 w-screen flex justify-center items-center p-4">
        <div className="w-full max-w-7xl px-8">
          <Header />
        </div>
      </div>
      <div className="row-span-9 w-screen flex justify-center px-8">
        <div className="max-w-7xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
