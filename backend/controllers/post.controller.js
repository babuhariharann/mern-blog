import Post from "../model/post.model.js"
import { ErrorHandler } from "../utils/ErrorHandler.js"

export const CreatePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(ErrorHandler(400, "You are not authorized"))
  }
  if (!req.body.title || !req.body.content) {
    return next(ErrorHandler(401, "Please provide all details"))
  }

  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  try {
    const newPost = new Post({
      ...req.body, slug, userId: req.user.id
    })
    const savedPost = await newPost.save();
    console.log('savedpost', savedPost)
    return res.status(200).json({ status: true, message: "Successfully created the post", createdP  ost: savedPost })
  } catch (err) {
    next(err)
  }
}