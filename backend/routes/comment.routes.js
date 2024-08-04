
import express from 'express'
import { CreateComment, GetComments } from '../controllers/comment.controller.js'
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router()


/** comment routes */

router.post('/create', VerifyUser, CreateComment);
router.get('/getcomments/:postId', GetComments)


export default router;