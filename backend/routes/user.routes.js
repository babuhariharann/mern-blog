import express from "express";
import { TestApi } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", TestApi);

export default router;
