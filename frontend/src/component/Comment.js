import React, { useEffect, useState } from 'react'
import { FetchUserIdAPI } from '../api/api'
import moment from 'moment';
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { UpdateCommentAPI } from '../api/comment';


const Comment = (props) => {

  console.log('commentpropss', props)

  const { value, handleLike, handleUpdateComment, handleDeleteComment } = props;
  const { currentUser } = useSelector((state) => state.user)
  const { _id, content, userId, postId, createdAt, numberOfLikes, likes } = value
  const [userData, setUserData] = useState({});
  const [editContent, setEditContent] = useState(content);
  const [editCommentId, setEditCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false)


  console.log('likesss', likes)

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


  /** handle save comment  */


  const handleCommentSave = () => {
    setIsEditing(false);
    handleUpdateComment(_id, editContent)
  }


  /** handle delete comment */


  const deleteComment = (id) => {
    setIsEditing(false);
    handleDeleteComment(id)
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

          {isEditing ?
            <div className='w-100'>
              <textarea className='w-100' style={{ minHeight: "150px" }} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <div className='d-flex align-items-center gap-3'>
                <button className='btn btn-danger' onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                <button className='btn btn-success' onClick={handleCommentSave}>Save</button>
              </div>
            </div>
            : <>
              <p>{content}</p>
              <button className={`d-flex align-items-center gap-2 border-0 outline-0 bg-transparent like_button ${likes.includes(userId) ? 'liked' : ""}`} onClick={() => handleLike(_id)}><BiSolidLike />
                {numberOfLikes ? <p className='text-white-50 mb-0'>{numberOfLikes} </p> : <></>}</button>
              {currentUser && (currentUser._id === userId || currentUser.isAdmin) ? <div className='d-flex align-items-center gap-2  mt-3'>
                <button type='button' className='outline-0 border-0 bg-transparent text-white' onClick={() => setIsEditing(true)}>Edit</button>
                <button type='button' className='outline-0 border-0 bg-transparent text-white' onClick={() => deleteComment(_id)}>Delete</button>
              </div> : <></>}

            </>}

        </div>
      </div>
    </>
  )
}

export default Comment