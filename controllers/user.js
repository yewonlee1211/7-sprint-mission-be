import express from "express";
import {
  createToken,
  refreshToken,
  createUser,
  getUser,
  patchUser,
} from "../services/user.js";

const userController = express.Router();

// userController.post("/token/refresh", authRefreshMiddleware, refreshAccessToken);
userController.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const user = await createUser(data);
    if (!user) {
      return res
        .status(404)
        .json({ error: "signup 리퀘스트 데이터 확인 필요" });
    }
    const accessToken = createToken(user);
    const refreshToken = createToken(user, true);
    await patchUser(user.id, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.json({ accessToken, user });
  } catch (e) {
    console.error("❌ [signupUser] error:", e);
    res.status(500).json({ error: `${e}` });
  }
});

userController.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    if (!user) {
      return res.status(404).json({ error: "login 리퀘스트 데이터 확인 필요" });
    }
    const accessToken = createToken(user);
    const refreshToken = createToken(user, true);
    await patchUser(user.id, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.json({ accessToken, user });
  } catch (e) {
    console.error("❌ [loginUser] error:", e);
    res.status(500).json({ error: `${e}` });
  }
});

export default userController;

// 액세스 토큰 재발급
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken: refreshTk } = req.cookies;
    const userId = req.user.id;
    const { accessToken, newRefreshToken } = await refreshToken(
      userId,
      refreshTk
    );
    await patchUser(userId, { refreshToken: newRefreshToken });
    res.cookie("refreshToken", newRefreshToken, {
      path: "/token/refresh",
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.json({ accessToken });
  } catch (e) {
    console.error("❌ [refreshToken] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};
