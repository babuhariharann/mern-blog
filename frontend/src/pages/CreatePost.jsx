import React, { useState } from 'react'
import '../asset/css/createpost.css'
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CreatePostAPI } from '../api/post';
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null)

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

  const [createPostData, setCreatePostData] = useState({});


  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setPublishError(null)
      const createPostResponse = await CreatePostAPI(createPostData);
      if (createPostResponse?.status) {
        setLoading(false);
        setPublishError(null)
        navigate(`/post/${createPostResponse?.createdPost?.slug}`);
      } else {
        setLoading(false);
        setPublishError(createPostResponse?.message);
        return
      }
    } catch (error) {
      setPublishError(error)
    }
  }

  console.log(createPostData)
  return (
    <section className='py-5 create-post'>
      <div className='container'>
        <form>
          <h4>Create a Post</h4>
          <div className='create-post__header'>
            <input className='p-3' placeholder='Enter title' name='title' type='text' onChange={(e) => setCreatePostData({ ...createPostData, title: e.target.value })} />
            <div>
              <Select
                // value={selectedCategory}
                options={categoryOptions}
                onChange={(e) => setCreatePostData({ ...createPostData, category: e.value })
                }
              />
            </div>

          </div>
          <div className='create-post__image-upload mt-4'>
            <input type='file' accept='image/*' />
          </div>

          <div className='create-post__react-quill mt-4'>
            <ReactQuill theme="snow" onChange={(value) => setCreatePostData({ ...createPostData, content: value })} />
          </div>

          <div className='create-post__button mt-3' >
            <button
              className='btn btn-warning w-100'
              onClick={handleCreatePost}
              type='submit'
              disabled={loading}>
              {loading ? "Loading..." : "Publish"}
            </button>
          </div>
        </form>
        {publishError && <p className='text-danger'>{publishError
        }</p>}
      </div>
    </section>
  )
}

export default CreatePost