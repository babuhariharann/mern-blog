import express from 'express'
import { CreatePost, DeletePost, GetPosts, UpdatePost } from '../controllers/post.controller.js';
import { VerifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.post('/create-post', VerifyUser, CreatePost);
router.get('/getposts', GetPosts);
// router.get('/getposts', (req, res) => console.log('updatefetch', req));

router.delete('/deletepost/:postId/:userId', VerifyUser, DeletePost);
router.put('/updatepost/:postId/:userId', VerifyUser, UpdatePost)
// router.put('/updatepost/:postid/:userId', (req, res) => console.log('reqqq', req.body))


export default router;