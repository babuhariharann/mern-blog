import React, { useEffect, useState } from 'react'
import '../asset/css/createpost.css'
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CreatePostAPI, fetchUpdatePostAPI, updatePostAPI, } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  console.log('postid', postId)
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false)
  const [publishError, setPublishError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);


  const { currentUser } = useSelector((state) => state?.user);

  const categoryOptions = [
    {
      value: "javascript", label: "Javascript"
    },
    {
      value: "html", label: "HTML"
    },
    {
      value: "css", label: "CSS"
    },
  ]
  const [bodyValue, setBodyValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [createPostData, setCreatePostData] = useState({
    title: '',
    content: "",
    category: ''
  });


  /** fetch updated post */

  const handleFetchUpdatePost = async () => {

    try {
      setPageLoading(true)
      const fetchUpdatepost = await fetchUpdatePostAPI(postId);

      if (fetchUpdatepost.success) {
        const post = fetchUpdatepost?.posts[0];
        console.log('postcontent', post)
        setCreatePostData(
          {
            title: post?.title,
            content: post.content,
            category: categoryOptions.find(option => option.value === post.category),
          }
        )
        setSelectedOption(categoryOptions.find(option => option.value === post.category));
        setPageLoading(false)

      }

    } catch (error) {
      setPageLoading(false)

      setPublishError(error);
      console.log('Error while fetch updated post', error)
    }
  }

  useEffect(() => {
    handleFetchUpdatePost()
  }, [postId]);

  console.log('createPostData', createPostData)


  // const handleCreatePost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     setPublishError(null)
  //     const createPostResponse = await CreatePostAPI(createPostData);
  //     if (createPostResponse?.status) {
  //       setLoading(false);
  //       setPublishError(null)
  //       navigate(`/post/${createPostResponse?.createdPost?.slug}`);
  //     } else {
  //       setLoading(false);
  //       setPublishError(createPostResponse?.message);
  //       return
  //     }
  //   } catch (error) {
  //     setPublishError(error)
  //   }
  // }


  /** update post function */

  const handleUpdatePost = async (e) => {
    e.preventDefault()
    try {
      const updatePostResponse = await updatePostAPI(createPostData, postId, currentUser._id);
      if (updatePostResponse?.success) {
        setPublishError(null);
        navigate('/dashboard?tab=post')
      }
      console.log('updateresponse', updatePostResponse)
    } catch (error) {
      setPublishError(error);
      console.log('error while update the post', error)
    }
  }



  /** react select function */


  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setCreatePostData({ ...createPostData, category: selectedOption.value });
  };
  console.log('createpostdate', createPostData)

  return (
    <section className='py-5 create-post'>
      <div className='container'>
        {pageLoading ? <p>Loading...</p> : <>
          <form onSubmit={handleUpdatePost}>
            <h4>Update a Post</h4>
            <div className='create-post__header'>
              <input
                className='p-3'
                placeholder='Enter title'
                name='title' type='text'
                value={createPostData.title}
                onChange={(e) => setCreatePostData({ ...createPostData, title: e.target.value })} />
              <div>
                <Select
                  value={selectedOption}
                  options={categoryOptions}
                  onChange={handleSelectChange}
                />
              </div>

            </div>
            <div className='create-post__image-upload mt-4'>
              <input type='file' accept='image/*' />
            </div>

            <div className='create-post__react-quill mt-4'>
              <ReactQuill
                value={createPostData.content}
                theme="snow"
                onChange={(value) => setCreatePostData({ ...createPostData, content: value })} />
            </div>

            <div className='create-post__button mt-3' >
              <button
                className='btn btn-warning w-100'
                type='submit'
                disabled={loading}>
                {loading ? "Loading..." : "Publish"}
              </button>
            </div>
          </form>
          {publishError && <p className='text-danger'>{publishError
          }</p>}</>}
      </div>
    </section>
  )
}

export default UpdatePost