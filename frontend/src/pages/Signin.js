import React, { useState } from "react";

import "../asset/css/signin.css";
import InputField from "../component/InputField";
import { Link } from "react-router-dom";

const Signin = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("inputdata", inputData);
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
            <div>
              <div className="d-flex flex-column align-items-start">
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
              <div className="">
                <button className="mt-4 primary_button">Sign In</button>
              </div>

              <button className="border_button mt-4">
                Continue with google
              </button>
              <p className="mt-3">
                Don't have account?{" "}
                <Link className="link" to="/sign-up">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
