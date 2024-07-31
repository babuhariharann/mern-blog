import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminDeleteUserAPI, DeleteUserAPI, FetchUserAPI, ShowMoreUserAPI } from '../api/api';
import { useSelector } from 'react-redux';

const DashUser = () => {


  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [allUser, setAllUsers] = useState([])

  /** fetchh all users */

  const handleFetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchReponse = await FetchUserAPI();
      if (fetchReponse?.success) {
        setAllUsers(fetchReponse?.users)
        if (fetchReponse?.users.length >= 9) {
          setShowMore(true)
        }
      }
      console.log('fetchresponse', fetchReponse)

    } catch (error) {

    }
  }


  /** show more user */

  const handleShowMoreUser = async () => {
    try {

      const showMoreResponse = await ShowMoreUserAPI(allUser.length + 1);
      if (showMoreResponse?.success) {
        setAllUsers((prev) => [...prev, ...showMoreResponse.users])
        console.log('userlength', showMoreResponse.users.length)
        if (showMoreResponse.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setError(error);
      console.log('Error while click show more user', error)
    }
  }

  /** delete users */


  const handleUserDelete = async (id) => {

    try {
      const deleteUserResponse = await AdminDeleteUserAPI(id);
      if (deleteUserResponse?.success) {
        navigate(0)
      }

    } catch (error) {
      setError(error);
      console.log('Error while delete the user', error)
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin) {
      handleFetchUsers()
    }
  }, []);


  console.log('allusers', allUser)
  return (
    <div>
      <table className='table table-dark table-responsive'>
        <thead>
          <tr>
            <td>Date Updated</td>
            <td>Profile</td>
            <td>Name</td>
            <td>Email</td>
            <td>Is Admin</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {currentUser.isAdmin
            && allUser && allUser.length > 0 ? allUser.map((user) => (
              <tr key={user._id}>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ width: "100px", height: "100px", overflow: "hidden", borderRadius: "50%" }}>
                    <Link to={`/`}>
                      <img src={user.profilePicture} className='img-fluid' />
                    </Link>
                  </div>
                </td>
                <td>
                  <Link to={`/`} className='text-decoration-none text-white'>
                    {user.username}
                  </Link></td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? <p>True</p> : <p>False</p>}
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleUserDelete(user._id)} >
                    Delete
                  </button>
                </td>
              </tr>
            )) : <tr><td>No user Found</td></tr>}



        </tbody>
      </table>

      {showMore ? <button className='btn btn-success' onClick={handleShowMoreUser} >
        Show More</button> : <></>}


    </div>
  )
}

export default DashUser