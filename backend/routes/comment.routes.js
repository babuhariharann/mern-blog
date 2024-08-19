
import express from 'express'
import { CreateComment, DeleteComment, EditComment, GetComments, LikeComment } from '../controllers/comment.controller.js'
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router()


/** comment routes */

router.post('/create', VerifyUser, CreateComment);
router.get('/getcomments/:postId', GetComments);
router.put('/like/:commentId', VerifyUser, LikeComment);
router.put('/editcomment/:commentId', VerifyUser, EditComment);
router.delete('/delete/:commentId', VerifyUser, DeleteComment)



export default router;