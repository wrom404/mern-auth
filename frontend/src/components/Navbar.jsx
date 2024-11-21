import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="py-4 text-center text-gray-200 bg-gray-950 bg-opacity-95 border-b-2 border-gray-900">
        <Link className="mx-4 hover:text-indigo-600" to={"/"}>
          Home
        </Link>
        <Link className="mx-4 hover:text-indigo-600" to={"/signup"}>
          Signup
        </Link>
        <Link className="mx-4 hover:text-indigo-600" to={"/login"}>
          Login
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
