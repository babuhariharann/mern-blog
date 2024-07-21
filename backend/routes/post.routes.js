import express from 'express'
import { CreatePost, GetPost } from '../controllers/post.controller.js';
import { VerifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.post('/create-post', VerifyUser, CreatePost);
router.get('/getposts', GetPost);

export default router;