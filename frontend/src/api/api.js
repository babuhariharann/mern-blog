import axios from "axios";

const localHostName = "http://localhost:5000";

axios.defaults.withCredentials = true;

/** Signup API */

export const SignupAPI = async (data) => {
  const { username, email, password } = data;
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      email,
      password,
    });
    console.log("res", res);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message,
    };
  }
};

/** Signin API */

export const SigninAPI = async (singinValue) => {
  const { email, password } = singinValue;
  console.log("email", email, password);
  try {
    const response = await axios.post(`${localHostName}/api/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    };
  }
};

/** Google Login API */

export const googleSigninAPI = async (displayName, email, photoURL) => {
  try {
    const response = await axios.post(`${localHostName}/api/auth/google`, {
      displayName,
      email,
      photoURL,
    });
    console.log("google response", response?.data);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    };
  }
};


/** update user */

export const UpdateUser = async (id, userFormData) => {
  console.log('api', id, userFormData)

  const { username, email, password } = userFormData

  try {

    const response = await axios.put(`${localHostName}/api/user/update/${id}`, { username, email, password }, { withCredentials: true });
    console.log('response', response);
    return response?.data;

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** Delete user */


export const DeleteUserAPI = async (id) => {

  try {
    const response = await axios.delete(`${localHostName}/api/user/delete/${id}`, { withCredentials: true })
    console.log('deleteresponse', response)
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** Signout user */

export const SignoutAPI = async () => {
  try {
    const response = await axios.post(`${localHostName}/api/user/signout`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** fetch users api */


export const FetchUserAPI = async () => {
  try {
    const response = await axios.get(`${localHostName}/api/user/getusers`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** delete select user api */


export const AdminDeleteUserAPI = async (id) => {
  try {

    const response = await axios.delete(`${localHostName}/api/user/admin-delete/${id}`)
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** show more user */

export const ShowMoreUserAPI = async (startIndex) => {

  try {
    const response = await axios.get(`${localHostName}/api/user/getusers?start=${startIndex}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** fetch user using id */

export const FetchUserIdAPI = async (userId) => {
  try {
    const response = await axios.get(`${localHostName}/api/user/getusers/${userId}`);
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}