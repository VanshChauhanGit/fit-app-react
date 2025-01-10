import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaRunning } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <nav className="bg-black z-50 text-white md:hidden top-0 w-full fixed md:w-auto items-center px-6 py-2">
        <div className="flex items-center gap-2 font-bold text-2xl text-primary">
          Fit <BsLightningCharge size={24} />
        </div>
      </nav>
      <nav className="bg-black z-50 text-white fixed bottom-0 w-full md:fixed md:top-0 md:w md:h-20 md:w-full md:flex md:items-center md:px-8 md:py-4">
        {/* Desktop App Name */}
        <div className="hidden md:flex md:items-center gap-2 font-bold text-2xl text-primary">
          Fit <BsLightningCharge size={24} />
        </div>
        <div className="flex justify-around items-center md:ml-auto">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaHome size={24} />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          {/* Workout Plan Link */}
          <NavLink
            to="/workoutplan"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <AiFillSchedule size={24} />
            <span className="text-sm">Workout Plan</span>
          </NavLink>
          {/* Workout Link */}
          <NavLink
            to="/workout"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaRunning size={24} />
            <span className="text-sm">Workout</span>
          </NavLink>
          {/* Profile Link */}
          {/* <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center px-4 py-2 ${
              isActive ? "text-primary" : "text-gray-400"
            }`
          }
        >
          <FaUser size={24} />
          <span className="text-sm">Profile</span>
        </NavLink> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
