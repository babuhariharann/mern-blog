

/** Create comment */

import Comment from "../model/comment.model.js"
import { ErrorHandler } from "../utils/ErrorHandler.js"

/** create comment */

export const CreateComment = async (req, res, next) => {

  const { content, userId, postId } = req.body

  console.log('comment verify', req.user.id, userId)

  if (req.user.id !== userId) {
    return next(ErrorHandler(400, 'You are not authorized to create the comment'))
  }
  try {
    const newComment = new Comment({
      content,
      userId,
      postId
    })
    await newComment.save();
    return res.status(200).json({
      success: true,
      message: "Comment created successfully",
      newComment
    })
  } catch (error) {
    next(error)
  }
}

/** get comments */

export const GetComments = async (req, res, next) => {
  const postId = req.params.postId;
  console.log('postid', postId)
  if (!postId) {
    return next(ErrorHandler(404, 'Need post id'))
  }
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: "Fetched comments successfully", comments })

  } catch (error) {
    next(error)
  }
}