import { ErrorHandler } from "./ErrorHandler.js";
import jwt from 'jsonwebtoken'


export const VerifyUser = (req, res, next) => {
  console.log('reqq', req.cookies)
  const token = req.cookies.access_token;
  if (!token) {
    return next(ErrorHandler(401, "unauthorized"
    ));
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return next(ErrorHandler(401, 'Unauthorized'))
    }
    console.log('userr', user);
    req.user = user;
    next();
  })
}


