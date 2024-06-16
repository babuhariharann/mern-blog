// import package

import bcryptjs from "bcryptjs";

import User from "../model/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

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
    }
    return res
      .status(200)
      .json({ status: true, message: "Signin Successfully" });
  } catch (err) {
    next(err);
  }
};
