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
    const reponseData = await res.data;
    return reponseData;
  } catch (err) {
    console.log("Error while signup", err);
  }
};
export const SigninAPI = () => {
  console.log("signin");
};
