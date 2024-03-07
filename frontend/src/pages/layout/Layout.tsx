import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SideBar } from "./SideBar";
import { useState } from "react";

export const Layout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="bg-slate-100 min-h-[100vh] h-auto flex flex-col gap-4">
      <Navbar setSideBarOpen={setSideBarOpen} />
      <div>
        <div
          className={`absolute h-full w-full z-10 top-0 ${
            !sideBarOpen && "left-[-100%]"
          }`}
        >
          <div
            className="bg-black w-full h-full absolute z-10 top-0 opacity-75"
            onClick={() => setSideBarOpen(false)}
          ></div>
          <SideBar setSideBarOpen={setSideBarOpen} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
