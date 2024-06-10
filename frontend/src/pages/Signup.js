import React, { useState } from "react";

import "../asset/css/signin.css";
import InputField from "../component/InputField";
import { Link, useNavigate } from "react-router-dom";
import { SignupAPI } from "../api/api";

const Signup = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { username, email, password } = inputData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      return setError("Please fill all the form");
    }
    setError(null);
    setLoading(true);
    try {
      const responseData = await SignupAPI(inputData);

      if (responseData.success) {
        navigate("/sign-in");
        setError(null);
      } else {
        setError(responseData.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occured.Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="col-6 d-flex align-items-center justify-content-center">
            <div>
              <h3>Sign Up</h3>
            </div>
          </div>
          <div className="col-6">
            <form onSubmit={handleSignup}>
              <div className="d-flex flex-column align-items-start">
                <label className="ms-0"> Username</label>
                <InputField
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start mt-3">
                <label className="ms-0"> Your email</label>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start mt-3">
                <label className="ms-0"> Your Password</label>
                <InputField
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleOnChange}
                />
              </div>

              {error && <p className="text-danger mb-0">{error}</p>}
              <div className="">
                <button className="mt-4 primary_button">Sign Up</button>
              </div>

              <button type="submit" className="border_button mt-4">
                Continue with google
              </button>
              <p className="mt-3">
                Already have an account?{" "}
                <Link className="link" to="/sign-in">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
