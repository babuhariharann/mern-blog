import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** import local files */

import '../asset/css/dashprofile.css'
import InputField from './InputField';
import { DeleteUserAPI, SignoutAPI, UpdateUser } from '../api/api';
import { signoutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const DashProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { currentUser, loading } = useSelector((state) => state?.user);
  const { email, username, profilePicture, isAdmin } = currentUser;
  const [userFormData, setUserFormData] = useState({
    email,
    username,
    password: ""
  });



  console.log('isadmin', isAdmin);

  const handleDataUpdate = useCallback((e) => {
    const { name, value } = e.target
    console.log('name value', name, value)
    setUserFormData((prev) => ({ ...prev, [name]: value }))
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('object', Object.keys(userFormData).length);
    // if (userFormData.email === "" || userFormData.username === "" || userFormData.password === "") {
    //   return
    // }
    try {
      dispatch(updateStart());
      const updateResponse = await UpdateUser(currentUser._id, userFormData);
      console.log('updateresponse', updateResponse);
      if (!updateResponse?.success) {
        return dispatch(updateFailure())
      } else {
        dispatch(updateSuccess(updateResponse?.rest))
      }
    } catch (err) {
      dispatch(updateFailure());
    }
  }

  const DeleteUser = async () => {
    console.log('currerntid', currentUser._id)
    try {
      const DeleteResponse = await DeleteUserAPI(currentUser._id);
      if (!DeleteResponse?.success) {
        return alert("Cannot delete user")
      } else {
        navigate('/sign-in')
      }

    } catch (err) {
      console.log(err)
    }
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
    <div className='dashprofile d-flex flex-column align-items-center'>
      <h5 className='text-warning text-center'>Profile</h5>

      <div className='profile_wrapper mt-5'>
        <img src={profilePicture} alt="" />
      </div>

      <form>
        {Object.entries(userFormData)?.map(([key, value], index) => (
          <div key={index} >
            <InputField
              type={key === "password" ? "password" : "text"}
              name={key}
              value={value}
              onChange={handleDataUpdate} />
          </div>
        ))
        }
        <button className='btn btn-warning mt-4' type='submit' onClick={handleUpdate}>
          {loading ? "Updating..." : "Update"}
        </button>

        {isAdmin && <div className='my-3'>
          <button type='submit' className='btn btn-success w-100' onClick={() => navigate('/create-post')} >Create Post</button>
        </div>}
      </form >

      <div className='d-flex align-items-center justify-content-between mt-4'>
        <button className='btn btn-danger' onClick={DeleteUser}>Delete User</button>
        <button className='btn btn-primary' onClick={handleSignout}>Sign Out</button>
      </div>

    </div >
  )
}

export default DashProfile