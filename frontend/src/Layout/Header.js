import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../asset/css/header.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { SignoutAPI } from "../api/api";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state?.user)
  // const { isAdmin } = currentUser
  const [showProfileDetails, setShowProfileDetails] = useState(false)


  const handleSignin = () => {
    navigate("/sign-in");
  };
  const handleProfileNavigate = () => {
    navigate('/dashboard?tab=profile')
  }

  /** signout functionality */

  const handleSignout = async () => {

    try {
      const singoutResponse = await SignoutAPI();
      if (singoutResponse?.success) {
        dispatch(signoutSuccess())
        navigate('/')
      } else {
        return alert('Cannot signout now')
      }
    } catch (err) {
      console.log('Error while singout :', err)
    }
  }
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
            {currentUser ? (
              <div className="profile_details position-relative">
                <div className="profile_wrapper" style={{ cursor: "pointer" }} onClick={() => setShowProfileDetails(!showProfileDetails)}>
                  <img src={currentUser?.profilePicture} alt="" />
                </div>
                {showProfileDetails ?
                  <div className="profile_details_list">
                    <button onClick={handleProfileNavigate}>Profile</button>
                    <button onClick={handleSignout}>
                      Sign out
                    </button>
                  </div> : null}


              </div>

            ) :
              (
                <button className="pink_btn" onClick={handleSignin}>
                  Signin
                </button>
              )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
