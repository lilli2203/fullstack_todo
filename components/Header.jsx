import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { loggedUser, loggedIn, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/auth");
  };

  return (
    <>
      <header className="flex items-center justify-between py-4 px-12 bg-slate-200">
        <div className="">
          <Link to="/">
            <img src="" alt="TODOC" className="bg-slate-600" />
          </Link>
        </div>

        <div className="flex items-center">
          {!loggedIn ? (
            <Link to="/auth">
              <button className="bg-indigo-600 text-white py-3 px-8 rounded hover:bg-indigo-500">
                Start Now
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-8 relative">
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <p className="text-slate-500 font-bold">{loggedUser?.name}</p>
                <svg
                  className={`w-4 h-4 ml-2 transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              About
            </Link>
            <Link to="/services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Services
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Contact
            </Link>
          </div>
          <div>
            {loggedIn ? (
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
