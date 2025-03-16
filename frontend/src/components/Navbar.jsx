import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-4/5 mx-auto justify-center gap-4">
      <NavLink
        className={({ isActive }) =>
          `p-2.5 w-2/5 text-lg  font-bold flex items-center mb-1 ${
            isActive ? "bg-[#3a4c8fe5] !text-white" : "bg-blue-100"
          }`
        }
        to="/videoDetails"
      >
        Video Details
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `p-2.5 w-2/5 text-lg  font-bold flex items-center mb-1 ${
            isActive ? "bg-[#3a4c8fe5] !text-white" : "bg-blue-100"
          }`
        }
        to="/logs"
      >
        Logs
      </NavLink>
    </div>
  );
};

export default Navbar;
