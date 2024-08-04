import express from "express";
import { AdminDeleteUser, DeleteUser, GetUser, GetUserID, Signout, TestApi, UpdateUser } from "../controllers/user.controller.js";
import { VerifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.get("/", TestApi);

router.get('/getusers', VerifyUser, GetUser);
router.get('/getusers/:userId', GetUserID);
router.put('/update/:userid', VerifyUser, UpdateUser);
router.delete('/delete/:userid', VerifyUser, DeleteUser);
router.delete('/admin-delete/:id', VerifyUser, AdminDeleteUser)
router.post('/signout', Signout);




export default router;
