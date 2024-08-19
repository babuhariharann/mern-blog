import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../asset/css/header.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { SignoutAPI } from "../api/api";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

  console.log('location', location)

  const { currentUser } = useSelector((state) => state?.user)
  // const { isAdmin } = currentUser
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [searchValue, setSearchValue] = useState('')


  const handleSignin = () => {
    navigate("/sign-in");
  };
  const handleProfileNavigate = () => {
    navigate('/dashboard?tab=profile');
    setShowProfileDetails(false)
  }

  /** signout functionality */

  const handleSignout = async () => {
    setShowProfileDetails(false)
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

  /** search submit function */

  const handleSearhSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchValue);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    if (searchTermFromURL) {
      setSearchValue(searchTermFromURL)
    }


  }, [location.search])
  return (
    <header className="header">
      <div className="container h-100">
        <div className="d-flex align-items-center justify-content-between h-100">
          <Link to="/" className="text-decoration-none logo_link">
            MERN
          </Link>

          <form className="input_wraper d-flex align-items-center justify-content-betweeen gap-2" onSubmit={handleSearhSubmit}>
            <input
              value={searchValue}
              type="text"
              placeholder="Search"
              className="border-0 outline-0 bg-transparent"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="button" className="border-0 outline-0 bg-transparent">
              <CiSearch fill="#e74694" fontSize={20} />
            </button>
          </form>

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
