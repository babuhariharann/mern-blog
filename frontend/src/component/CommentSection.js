import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CreateCommentAPI, FetchCommentAPI } from '../api/comment';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

const CommentSection = (props) => {


  const navigate = useNavigate()

  const { postId } = props
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState(null);
  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState([])


  /** post a comment */

  const handlePostComment = async (e) => {
    e.preventDefault()
    try {
      const createCommentResponse = await CreateCommentAPI(comment, postId, currentUser._id);
      if (createCommentResponse?.success) {
        setComment('');
        setError(null);
        fetchComment()
      }
    } catch (error) {
      setError(error);
      console.log("Error while create a comment", error)
    }
  }

  /** fetch a comment */


  const fetchComment = async () => {
    try {
      const fetchCommentResponse = await FetchCommentAPI(postId);
      if (fetchCommentResponse?.success) {
        setCommentData(fetchCommentResponse?.comments)
      }
    } catch (error) {
      setError(error);
      console.log('Error while fetch blog post comment', error)
    }

  }

  useEffect(() => {
    fetchComment()
  }, [postId])

  return (

    <>
      <div className='card bg-dark p-3 text-white' >

        {currentUser ? <form onSubmit={handlePostComment}>
          <div className='d-flex flex-column w-25 gap-3'>
            <textarea className='p-2' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className='btn btn-warning' type='submit' >
              Post
            </button>
          </div>
        </form> : <p>You must be logged in to comment <Link to='/login'>Login</Link></p>}

        <p>Comments : <span className='text-warning'>{commentData.length}</span></p>


        {commentData && commentData.length ? commentData.map((value) =>
          <div className='mb-3 comment-separate' key={value._id}>
            <Comment value={value} />
          </div>
        ) : <p>no data</p>}


      </div>

    </>
  )
}

export default CommentSection