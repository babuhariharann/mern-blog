import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DeletePostAPI, FetchPostAPI, ShowMorePostAPI } from '../api/post';
import { Link } from 'react-router-dom';

const DashPost = () => {

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);

  /** fetch initial post function */

  const FetchPost = async () => {
    try {
      setLoading(true);
      const fetchReponse = await FetchPostAPI(currentUser);
      if (fetchReponse.success) {
        setPost(fetchReponse?.posts)
        setLoading(false)
        if (fetchReponse.posts.length < 9) {
          setShowMore(false)
        }
      }
    }
    catch (error) {
      setError(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin) {
      FetchPost();
    }
  }, [])


  /** show more button function */

  const handleShowMore = async () => {
    const startIndex = post.length;
    try {
      setLoading(true)
      const showMoreResponse = await ShowMorePostAPI(currentUser, startIndex);
      if (showMoreResponse.success) {
        setLoading(false);
        console.log('showmoreresponse', showMoreResponse)
        setPost((prev) => [...prev, ...showMoreResponse?.posts])
        if (showMoreResponse.posts.length < 9) {
          setShowMore(false)
        }
      }

    } catch (error) {
      setError(error);
      console.log('Error while click show more', error)
    }
  }

  /** delete post function  */

  const handleDeletePost = async (postid) => {
    console.log('postid', postid);
    try {
      const deleteResponse = await DeletePostAPI(currentUser._id, postid);
      console.log('deleteresponse', deleteResponse)
      if (deleteResponse.success) {
        setPost((prev) => prev.filter((post) => post._id !== postid))
      }

    } catch (error) {
      setError(error);
      console.log('Error while delete the post', error)
    }
  }

  console.log('post', post)
  return (
    <div>
      {currentUser.isAdmin && post && post.length > 0 && <table className='table table-dark table-responsive'>
        <thead>
          <tr>
            <td>Date Updated</td>
            <td>Post Image</td>
            <td>Title</td>
            <td>Category</td>
            <td>Delete</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {post.length ? post.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <div style={{ width: "100px", height: "100px", overflow: "hidden" }}>
                  <Link to={`/post/${item.slug}`}>
                    <img src={item.image} className='img-fluid' />
                  </Link>
                </div>
              </td>
              <td>
                <Link to={`/post/${item.slug}`} className='text-decoration-none text-white'>
                  {item.title}
                </Link></td>
              <td>{item.category}</td>
              <td>
                <Link to={`/update-post/${item._id}`} className='btn btn-warning' >
                  Edit
                </Link>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDeletePost(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : <tr><td colSpan={6}>No Data Found</td></tr>}

        </tbody>
      </table>}

      {showMore && <button className='btn btn-success' onClick={handleShowMore}>
        Show More</button>}
    </div>
  )
}

export default DashPost