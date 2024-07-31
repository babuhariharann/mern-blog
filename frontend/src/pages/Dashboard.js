import React, { useEffect, useState } from 'react'
import DashSidebar from '../component/DashSidebar'
import { useLocation } from 'react-router-dom'
import DashProfile from '../component/DashProfile';

/** local file import */

import '../asset/css/dashboard.css'
import DashPost from '../component/DashPost';
import DashUser from '../component/DashUser';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("")
  console.log("location", location)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [location.search])
  return (
    <div className='d-flex dashboard ' >
      <div className='sidebar'>
        <DashSidebar />
      </div>
      <div className='mainbar'>
        {tab === "profile" && <DashProfile />}
        {tab === "post" && <DashPost />}
        {tab === 'user' && <DashUser />}
      </div>

    </div>
  )
}

export default Dashboard