import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md py-4 px-4 flex justify-between items-center">
      <h1 className="text-1xl font-bold text-blue-700">🔐 SafeDrop</h1>
      <nav className="space-x-4">
        <Link
          to="/"
          className={`px-4 py-1 rounded-xl text-lg font-semibold shadow-md transition duration-200 border-2 ${
            isActive("/")
              ? "bg-blue-400 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          to="/upload"
          className={`px-4 py-1 rounded-xl text-lg font-semibold shadow-md transition duration-200 border-2 ${
            isActive("/upload")
              ? "bg-blue-400 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Upload
        </Link>
        <Link
          to="/download"
          className={`px-4 py-1 rounded-xl text-lg font-semibold shadow-md transition duration-200 border-2 ${
            isActive("/download")
              ? "bg-blue-400 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Download
        </Link>
        <Link
          to="/about"
          className={`px-4 py-1 rounded-xl text-lg font-semibold shadow-md transition duration-200 border-2 ${
            isActive("/about")
              ? "bg-blue-400 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
