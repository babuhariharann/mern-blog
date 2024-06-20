import React, { useState } from "react";

import "../asset/css/signin.css";
import InputField from "../component/InputField";
import { Link, useNavigate } from "react-router-dom";
import { SigninAPI } from "../api/api";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signinData;

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || email === "" || password === "") {
      return setError("All fields are required");
    }
    setError(null);
    setLoading(true);
    try {
      const signinResponse = await SigninAPI(signinData);
      console.log("singinresponse", signinResponse);
      if (signinResponse?.status) {
        navigate("/");
        setError(null);
      } else {
        setError(
          signinResponse && signinResponse.message
            ? signinResponse.message
            : "Sign-in Failed"
        );
      }
    } catch (err) {
      setError(err.message || "An error occured while sign-in");
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
              <h3>Sign in</h3>
            </div>
          </div>
          <div className="col-6">
            <form onSubmit={handleSigninSubmit}>
              <div className="d-flex flex-column align-items-start">
                <label className="ms-0"> Your email</label>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleSigninChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start mt-3">
                <label className="ms-0"> Your Password</label>
                <InputField
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleSigninChange}
                />
              </div>
              <div className="">
                <button className="mt-4 primary_button" type="submit">
                  Sign In
                </button>
              </div>
              {error && <p className="text-danger mb-0">{error}</p>}

              <button className="border_button mt-4">
                Continue with google
              </button>
              <p className="mt-3">
                Don't have account?{" "}
                <Link className="link" to="/sign-up">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
