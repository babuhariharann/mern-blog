import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/** google imports */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

/** local files import */
import { app } from "../firebase";
import { googleSigninAPI } from "../api/api";
import { singinSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Google Login */

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultsFromGoogle.user;
      const responseGoogleLogin = await googleSigninAPI(displayName, email, photoURL);
      console.log('oauth', responseGoogleLogin)
      if (responseGoogleLogin?.status) {
        dispatch(singinSuccess(responseGoogleLogin?.rest));
        navigate("/");
      }
    } catch (err) {
      console.log("Error while google login", err);
    }
  };
  return (
    <button
      type="button"
      className="border_button mt-4"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
