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

/** getposts */

export const GetPosts = async (req, res, next) => {

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userid && { userid: req.query.id }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
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
      now.getFullYear(), now.getMonth() - 1, now.getDate()
    )

    const lastMonthPost = await Post.countDocuments({
      createdAt: {
        $gte: oneMonthAgo
      }
    })

    res.status(200).json({ success: true, message: "Fetch post successfully", totalPosts, posts, lastMonthPost })
  } catch (error) {
    next(error)
  }
}


/** Delete the post */

export const DeletePost = async (req, res, next) => {
  console.log('deletepost', req.user, req.user.isAdmin)
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(ErrorHandler(404, 'You are not allowed to this post'))
  }
  try {
    await Post.findByIdAndDelete(req.params.postId)
    return res.status(200).json({ success: true, message: "Post Deleted Successfully" })
  } catch (error) {
    next(error)
  }
}


/** update the post */

export const UpdatePost = async (req, res, next) => {
  console.log('updatebody', req.params.postId)
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(ErrorHandler(400, 'You are not allowed to edit this post'))
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
      $set: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.catgory
      }
    }, {
      new: true
    })
    return res.status(200).json({ success: true, message: "Post was updated successfully", updatedPost })
  }
  catch (error) {
    next(error)
  }
}