import express from 'express'
import { CreatePost } from '../controllers/post.controller.js';
import { VerifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.post('/create-post', VerifyUser, CreatePost)

export default router;