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
