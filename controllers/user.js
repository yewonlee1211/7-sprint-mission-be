import express from "express";
import {
  createUser,
  getUser,
  getUserById,
  refreshUserTokens,
  setTokenCookies,
} from "../services/user.js";
import {
  authLoginMiddleware,
  authRefreshMiddleware,
} from "../config/passport.js";

const userController = express.Router();

// 내 정보 가져가기
userController.get("/", authLoginMiddleware, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "유저 정보 가져오기 실패" });
    }
    return res.status(200).json({ user });
  } catch (e) {
    if (!res.headersSent) {
      return res.status(500).json({ error: "getuser Internal Server Error" });
    }
  }
});

// 리프레쉬 토큰 발급
userController.post(
  "/refresh/token",
  authRefreshMiddleware,
  async (req, res) => {
    const newTokens = await refreshUserTokens(req.user);
    await setTokenCookies(res, newTokens);
    return res.json({ refresh: "success" });
  }
);

// 회원가입
userController.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const user = await createUser(data);
    if (!user) {
      return res
        .status(404)
        .json({ error: "signup 리퀘스트 데이터 확인 필요" });
    }
    const tokens = await refreshUserTokens(user);
    await setTokenCookies(res, tokens);
    return res.json({ user });
  } catch (e) {
    console.error("❌ [signupUser] error:", e);
    return res.status(e.code).json({ error: `${e}` });
  }
});

// 로그인
userController.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    if (!user) {
      return res.status(404).json({ error: "login 리퀘스트 데이터 확인 필요" });
    }
    const tokens = await refreshUserTokens(user);
    await setTokenCookies(res, tokens);
    return res.json({ user });
  } catch (e) {
    console.error("❌ [loginUser] error:", e);
    return res.status(e.code).json({ error: `${e}` });
  }
});

// 로그아웃
userController.post("/logout", async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out successfully" });
  } catch (e) {
    console.error("❌ [logout] error:", e);
    return res.status(500).json({ error: `${e}` });
  }
});

export default userController;
