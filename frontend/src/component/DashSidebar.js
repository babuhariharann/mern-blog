import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { SignoutAPI } from '../api/api';
import { signoutSuccess } from '../redux/user/userSlice';

const DashSidebar = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state?.user);

  const { isAdmin } = currentUser;

  console.log('isadmin', isAdmin)

  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get('tab')
    if (tabFromURL) {
      setTab(tabFromURL)
    }
  }, [location.search])


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
    <div>
      <button className={`${tab === "profile" ? "active" : ""} bg-transparent border-0 outline-0 d-flex align-items-center justify-content-between w-100`} onClick={() => navigate('/dashboard?tab=profile')}>
        Profile <div className='badge text-bg-warning'>
          {isAdmin ? "Admin" : "User"}
        </div>
      </button>
      {currentUser.isAdmin && <button className={`${tab === "post" ? "active" : ""} bg-transparent border-0 outline-0 d-flex align-items-center justify-content-between w-100`} onClick={() => navigate('/dashboard?tab=post')}>
        Post
      </button>}


      {currentUser.isAdmin && <button className={`${tab === "post" ? "active" : ""} bg-transparent border-0 outline-0 d-flex align-items-center justify-content-between w-100`} onClick={() => navigate('/dashboard?tab=user')}>
        Users
      </button>}


      <button className={` bg-transparent border-0 outline-0 d-flex align-items-center justify-content-between w-100`} onClick={handleSignout}>
        Sign out
      </button>
    </div>
  )
}

export default DashSidebar