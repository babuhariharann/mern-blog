import React, { useState } from 'react'
import '../asset/css/createpost.css'
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {

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
  console.log('selectedcategory', selectedCategory)
  return (
    <section className='py-5 create-post'>
      <div className='container'>
        <form>
          <h4>Create a Post</h4>
          <div className='create-post__header'>
            <input />
            <div>
              <Select
                value={selectedCategory}
                options={categoryOptions}
                onChange={(e) => setSelectedCategory(e.value)
                }
              />
            </div>

          </div>
          <div className='create-post__image-upload mt-4'>
            <input type='file' accept='image/*' />
          </div>

          <div className='create-post__react-quill mt-4'>
            <ReactQuill theme="snow" value={bodyValue} onChange={setBodyValue} />
          </div>

          <div className='create-post__button mt-3'>
            <button className='btn btn-warning w-100'>Publish</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePost