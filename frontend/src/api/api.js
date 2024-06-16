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
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response ? err.response.data.message : "An error occured",
    };
  }
};
export const SigninAPI = () => {
  console.log("signin");
};
