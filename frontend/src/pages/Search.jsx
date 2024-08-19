import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FetchBlogPostAPI, FilterPost } from '../api/post';

const Search = () => {

  const location = useLocation();
  const navigate = useNavigate()

  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sortDirection: "desc",
    category: "uncategory"
  });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([])


  /** filter change */

  const handleChange = (e) => {
    const { value, name } = e.target
    setSearchData((prev) => ({ ...prev, [name]: value }))
  }

  console.log('searchstring2', searchData?.sortDirection)



  /** Search submit function */

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchData.searchTerm);
    urlParams.set('sortDirection', searchData.sortDirection);
    urlParams.set('category', searchData.category);
    const searchString = urlParams.toString();
    console.log('searchstring', searchData)
    navigate(`/search?${searchString}`)
  }

  /** fetch post */

  const handleFetchPost = async (urlString) => {
    try {
      setLoading(true)
      const fetchPostReponse = await FilterPost(urlString)
      if (!fetchPostReponse?.success) {
        setLoading(false)
        return;
      }
      console.log('fetchpostresponse', fetchPostReponse)
      // setPost(fetchPostReponse?.post)

    } catch (error) {
      console.log('error while search post', error)
    }
  }

  /** initial fetch */

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    const sortFromURL = urlParams.get('sortDirection');
    const categoryFromURL = urlParams.get('category');

    if (searchTermFromURL || sortFromURL || categoryFromURL) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromURL ? searchTermFromURL : "", sortDirection: sortFromURL ? sortFromURL : "desc",
        category: categoryFromURL ? categoryFromURL : "uncategory"
      })
    }

    const urlString = urlParams.toString()

    handleFetchPost(urlString)

  }, [location.search])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <form className='search_left' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label>Search</label>
              <input name='searchTerm' value={searchData.searchTerm}
                onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label>Sort</label>
              <input name='sortDirection' value={searchData.sortDirection}
                onChange={handleChange} />
            </div>
            <div>
              <label>Category</label>
              <input name='category' value={searchData.category}
                onChange={handleChange} />
            </div>
            <button type='submit' className='btn btn-warning mt-3'>Apply</button>
          </form>

        </div>
        <div className='col-9'>
          <div>
            right
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search