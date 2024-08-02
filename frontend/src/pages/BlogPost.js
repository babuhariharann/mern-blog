import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchBlogPost, FetchBlogPostAPI } from '../api/post';

const BlogPost = () => {


  const { slug } = useParams();
  console.log('slugpaams', slug)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchPost, setFetchPost] = useState([])


  /** fetch post details */

  const handleFetchPost = async () => {

    try {
      setError(null);
      setLoading(true);
      const fetchBlogPostResponse = await FetchBlogPostAPI(slug);
      if (fetchBlogPostResponse?.success) {
        setFetchPost(fetchBlogPostResponse.posts[0]);
        setError(null);
        setLoading(false)
      }

    } catch (error) {
      setError(error);
      setLoading(false)
      console.log('error while fetch blog post', error)
    }

  }

  console.log('postdetails', fetchPost)

  useEffect(() => {
    handleFetchPost()
  }, [slug])

  return (
    <div className='container'>
      {loading ? <p>Loading...</p> : <div >

        <h3>{fetchPost?.title}</h3>
        <img className='img-fluid' src={fetchPost?.image} />
      </div>}

      <div dangerouslySetInnerHTML={{ __html: fetchPost && fetchPost.content }}>

      </div>
    </div>
  )
}

export default BlogPost