import axios from "axios";

const localHostName = "http://localhost:5000";

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
