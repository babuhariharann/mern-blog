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

/** like comments */

export const LikeCommentAPI = async (commentId) => {
  try {
    const response = await axios.put(`${localHostName}/api/comment/like/${commentId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** update the comment */

export const UpdateCommentAPI = async (commentId, content) => {
  try {

    const response = await axios.put(`${localHostName}/api/comment/editcomment/${commentId}`, {
      content
    });
    return response?.data
  } catch (error) {
    return {
      sucess: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** delete the comment */

export const DeleteCommentAPI = async (commentId) => {
  try {
    const response = await axios.delete(`${localHostName}/api/comment/delete/${commentId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}