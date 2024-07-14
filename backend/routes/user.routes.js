import express from "express";
import { DeleteUser, Signout, TestApi, UpdateUser } from "../controllers/user.controller.js";
import { VerifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.get("/", TestApi);

router.put('/update/:userid', VerifyUser, UpdateUser);
router.delete('/delete/:userid', VerifyUser, DeleteUser);
router.post('/signout', Signout)



export default router;
