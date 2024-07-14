// import package

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

/** Signup */

export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log("request body", username, email, password);

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });

    next(ErrorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Successfully signup" });
  } catch (err) {
    // return res.status(400).json({ message: err.message });

    next(err);
  }
};

/** SignIn */

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "" || !email || !password) {
    return next(ErrorHandler(404, "All fields required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(ErrorHandler(404, "User Not Found"));
    }
    const checkPassword = bcryptjs.compareSync(password, validUser.password);
    if (!checkPassword) {
      return next(ErrorHandler("404", "Password Does not match"));
      // return res
      //   .status(200)
      //   .json({ status: true, message: "password does not match" });
    }
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin
      },
      "secret"
    );
    console.log("token_send", token);
    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ status: true, message: "Signin Successfully", rest });
  } catch (err) {
    next(err);
  }
};

/** Google Login */

export const GoogleLogin = async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;
  console.log("google", displayName, email, photoURL);
  try {
    const validUser = await User.findOne({ email });
    console.log("valid user is", validUser);
    if (validUser) {
      console.log("çonditions comes with if");
      const { password: pass, ...rest } = validUser._doc;
      const token = jwt.sign(
        {
          id: validUser._id,
          isAdmin: validUser.isAdmin
        },
        "secret"
      );
      console.log("token", token);
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ status: true, message: "Google Login Successfull", rest });
    } else {
      console.log("çonditions comes with else");
      const generateRandomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log(generateRandomPassword);
      const hashedPassword = bcryptjs.hashSync(generateRandomPassword, 10);

      const newUserUsingGoogle = new User({
        username:
          displayName.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photoURL,
      });
      await newUserUsingGoogle.save();
      const token = jwt.sign({ id: newUserUsingGoogle._id }, "secret");
      const { password, ...rest } = newUserUsingGoogle._doc;
      console.log("resst", rest);
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ status: true, message: "Google Signin Successfull", rest });
    }
  } catch (err) {
    next(err);
  }
};
