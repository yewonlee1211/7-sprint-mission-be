import express from "express";
import {
  loginUser,
  refreshAccessToken,
  signupUser,
} from "../controllers/user.js";

const router = express.Router();

// router.post("/token/refresh", authRefreshMiddleware, refreshAccessToken);
router.post("/signup", signupUser);
router.post("/", loginUser);

export default router;
