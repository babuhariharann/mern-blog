import React, { useEffect, useState } from 'react'
import { FetchUserIdAPI } from '../api/api'
import moment from 'moment';

const Comment = (props) => {

  const { value } = props
  const { _id, content, userId, postId, createdAt } = value
  const [userData, setUserData] = useState({})

  /** fetch user details */

  const fetchUser = async () => {
    try {
      const fetchUserResponse = await FetchUserIdAPI(userId);
      if (fetchUserResponse?.success) {
        setUserData(fetchUserResponse?.user)
      }
    } catch (error) {
      console.log('Error while fetch user using id', error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [postId])
  return (
    <>
      <div className='row'>
        <div className='col-1'><img src={userData.profilePicture} alt="" className='comment-profile__image' /></div>
        <div className='col-11'>
          <p>@ <b>{userData.username}</b> <span className='text-secondary'>{moment(createdAt).fromNow()}
          </span></p>
          <p>{content}</p>
          <div className='d-flex align-items-center gap-2'>like <p className='text-white-50 mb-0'>1 Like</p></div>
        </div>
      </div>
    </>
  )
}

export default Comment