import bcryptjs from 'bcryptjs';
import { ErrorHandler } from "../utils/ErrorHandler.js";
import User from '../model/user.model.js';

export const TestApi = (req, res) => {
  res.json({ message: "test api new successdfs" });
};


/** update the user */

export const UpdateUser = async (req, res, next) => {

  console.log('paramsid', req.params.id)
  if (req.user.id !== req.params.userid) {
    return next(ErrorHandler(403, 'You are not allowed to update this user'))
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(ErrorHandler(400, 'Password must be atleast 6 letters'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(ErrorHandler(400, "Username must be between 7 to 20 characters"))
    }
    if (req.body.username.includes(' ')) {
      return next(ErrorHandler(400, 'Username does not contains spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(ErrorHandler(400, 'Username must be a lowercase'))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(ErrorHandler(400, 'Username can only contain letters and numbers'));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      },
      {
        new: true
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "Updated the user successfully",
      rest
    })
    console.log('updated', rest)
  } catch (err) {
    next(err)
  }
}


/** delete the user */

export const DeleteUser = async (req, res, next) => {
  console.log('deleteparams', req.params.userid)
  if (req.user.id !== req.params.userid) {
    return next(ErrorHandler(400, 'Unauthorized'))
  }
  try {
    await User.findByIdAndDelete(req.params.userid);
    return res.status(200).json({ success: true, message: "User Deleted Successfully" })
  } catch (err) {
    return ErrorHandler(err)
  }
}

/** signout  */

export const Signout = async (req, res) => {
  try {
    res.clearCookie("access_token").status(200).json({ success: true, message: "User signout successfully" })
  } catch (err) {
    next(err)
  }
}