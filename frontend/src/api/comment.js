import axios from "axios";

const localHostName = "http://localhost:5000";

axios.defaults.withCredentials = true;



/** create comment */

export const CreateCommentAPI = async (content, postId, userId) => {

  console.log('userId', content, postId, userId)
  try {
    const response = await axios.post(`${localHostName}/api/comment/create`, {
      content,
      postId,
      userId
    })
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    };
  }
}

/** fetch comments */


export const FetchCommentAPI = async (postId) => {

  try {

    const response = await axios.get(`${localHostName}/api/comment/getcomments/${postId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    };
  }
}