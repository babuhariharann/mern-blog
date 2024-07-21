import Post from "../model/post.model.js"
import { ErrorHandler } from "../utils/ErrorHandler.js"

/** create post */

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
    return res.status(200).json({ status: true, message: "Successfully created the post", createdPost: savedPost })
  } catch (err) {
    next(err)
  }
}


/** get post */

export const GetPost = async (req, res) => {

  try {

    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $options: "i" }
          },
          {
            content: { $regex: req.query.searchTerm, $options: "i" }
          }
        ]
      })
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);


    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )

    const lastMonthPosts = await Post.countDocuments(
      {
        createdAt: {
          $gte: oneMonthAgo
        }
      }
    )

    res.status(200).json({
      success: true,
      message: "Fetch post successfully",
      totalPosts,
      lastMonthPosts
    })

  } catch (error) {
    next(error)
  }
}