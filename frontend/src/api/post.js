import axios from "axios";

const localHostName = "http://localhost:5000";

axios.defaults.withCredentials = true;

/** create post */

export const CreatePostAPI = async (createPostData) => {
  console.log('create post', createPostData)

  try {

    const response = await axios.post(`${localHostName}/api/post/create-post`, createPostData)
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    }
  }
}


/** fetch post */


export const FetchPostAPI = async (currentUser) => {
  try {
    const response = await axios.get(`${localHostName}/api/post/getposts?userId=${currentUser._id}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    }
  }
}

/** post show more */

export const ShowMorePostAPI = async (currentUser, startIndex) => {

  try {
    const response = await axios.get(`${localHostName}/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.date?.message ? error?.response?.data?.message
        : error?.message,
    }
  }
}


/** Delete post api */


export const DeletePostAPI = async (userId, postId) => {
  console.log('idss', userId, postId)
  try {
    const response = await axios.delete(`${localHostName}/api/post/deletepost/${postId}/${userId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.date?.message ? error?.response?.data?.message
        : error?.message,
    }
  }

}

/** fetch update post api */

export const fetchUpdatePostAPI = async (postId) => {
  try {
    const response = await axios.get(`${localHostName}/api/post/getposts?postId=${postId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.date?.message ? error?.response?.data?.message
        : error?.message,
    }
  }

}


/** update post api */

export const updatePostAPI = async (postData, postId, userId) => {
  console.log('postdata', postData);
  try {
    const response = await axios.put(`${localHostName}/api/post/updatepost/${postId}/${userId}`, postData);
    console.log('responsessss', response)
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.date?.message ? error?.response?.data?.message
        : error?.message,
    }
  }
}