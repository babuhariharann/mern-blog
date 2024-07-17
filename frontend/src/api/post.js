import axios from "axios";

const localHostName = "http://localhost:5000";

axios.defaults.withCredentials = true;

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
