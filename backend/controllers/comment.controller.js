

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


/** like comment */


export const LikeComment = async (req, res, next) => {
  console.log('commentid', req.params.commentId)
  try {
    const comment = req.params.commentId;
    if (!comment) {
      return next(ErrorHandler(400, 'Need comment Id'))
    }
    const findComment = await Comment.findById(comment);
    if (!findComment) {
      return next(ErrorHandler(404, 'Comment not found'))
    }

    const userIndex = findComment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      findComment.numberOfLikes += 1;
      findComment.likes.push(req.user.id)
    } else {
      findComment.numberOfLikes -= 1;
      findComment.likes.splice(userIndex, 1)
    }
    await findComment.save()

    return res.status(200).json({
      success: true,
      message: userIndex === -1 ? "Like successfully" : "Unlike successfully",
      comment: findComment
    })

  } catch (error) {
    next(error)
  }

}


/** edit comment */


export const EditComment = async (req, res, next) => {

  const commentId = req.params.commentId;
  const content = req.body.content

  try {
    const findComment = await Comment.findById(commentId);
    if (!findComment) {
      return next(ErrorHandler(404, 'Comment not found'))
    }
    if (findComment.userId !== req.user.id && !req.user.isAdmin) {
      return next(ErrorHandler(400, 'You are unauthoirzed to edit this comment'))
    }
    const updateComment = await Comment.findByIdAndUpdate(req.params.commentId, {
      content
    },
      {
        new: true
      })
    return res.status(200).json({
      success: true,
      message: "Comment edited successfully",
      comment: updateComment
    })
  } catch (error) {
    next(error)
  }
}


/** delete the comment */


export const DeleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  if (!commentId) {
    return next(ErrorHandler(400, 'Require comment Id'))
  }

  try {
    const findComment = await Comment.findById(commentId);
    if (!findComment) {
      return next(ErrorHandler(404, 'Comment not found'))
    }
    if (!req.user.isAdmin && req.user.id !== findComment.userId) {
      return next(ErrorHandler(400, 'You are unauthorized to delete this comment'))
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({
      success: true,
      message: "Comment delete successfully"
    })
  } catch (error) {
    next(error)
  }
} 