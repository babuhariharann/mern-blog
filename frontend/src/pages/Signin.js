import React, { useCallback, useState } from "react";

import "../asset/css/signin.css";
import InputField from "../component/InputField";
import { Link, useNavigate } from "react-router-dom";
import { SigninAPI } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  singinFailure,
  singinStart,
  singinSuccess,
} from "../redux/user/userSlice";
import OAuth from "../component/OAuth";

const Signin = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  console.log("loading", loading);

  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signinData;

  const handleSigninChange = useCallback((e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || email === "" || password === "") {
      // return setError("All fields are required");
      return dispatch(singinFailure("All fields are required"));
    }
    // setError(null);
    // setLoading(true);
    dispatch(singinStart());
    try {
      const signinResponse = await SigninAPI(signinData);
      console.log("singinresponse", signinResponse);
      if (signinResponse?.status) {
        navigate("/");
        // setError(null);
        dispatch(singinSuccess(signinResponse?.rest));
      } else {
        // setError(
        //   signinResponse && signinResponse.message
        //     ? signinResponse.message
        //     : "Sign-in Failed"
        // );
        dispatch(
          singinFailure(
            signinResponse && signinResponse.message
              ? signinResponse.message
              : "Sign-in Failed"
          )
        );
      }
    } catch (err) {
      // setError(err.message || "An error occured while sign-in");
      dispatch(singinFailure(err.message || "An error occured while sign-in"));
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
                  {loading ? "Loading" : "Sign In"}
                </button>
              </div>
              {error && <p className="text-danger mb-0">{error}</p>}

              <OAuth />
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
