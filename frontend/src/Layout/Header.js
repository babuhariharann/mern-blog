import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../asset/css/header.css";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/sign-in");
  };
  return (
    <header className="header">
      <div className="container h-100">
        <div className="d-flex align-items-center justify-content-between h-100">
          <Link to="/" className="text-decoration-none logo_link">
            MERN
          </Link>

          <div className="input_wraper d-flex align-items-center justify-content-betweeen gap-2">
            <input
              type="text"
              placeholder="Search"
              className="border-0 outline-0 bg-transparent"
            />
            <button className="border-0 outline-0 bg-transparent">
              <CiSearch fill="#e74694" fontSize={20} />
            </button>
          </div>

          <div className="page_navigation d-flex align-items-center gap-3">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/project">Project</Link>
          </div>

          <div className="auth_section">
            <button className="pink_btn" onClick={handleSignin}>
              Signin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
