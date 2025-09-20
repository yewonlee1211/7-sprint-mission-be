import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../middlewares/passport/jwtStrategy.js";
import { refreshUserTokens, setTokenCookies } from "../services/user.js";

// 로그인 했는지 검사
export async function authLoginMiddleware(req, res, next) {
  passport.authenticate(
    accessTokenStrategy,
    { session: false },
    (err, user, info) => {
      if (err) {
        console.error("❌ [authLoginMiddleware] error:", err);
        return res
          .status(500)
          .json({ error: "인증 처리 중 오류가 발생했습니다." });
      }

      if (!user) {
        return res.status(401).json({ error: "인증이 필요합니다." });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
}

//리프레쉬 토큰 맞는지 검사
export async function authRefreshMiddleware(req, res, next) {
  passport.authenticate(
    refreshTokenStrategy,
    { session: false },
    (err, user, info) => {
      if (err) {
        console.error("❌ [authRefreshMiddleware] error:", err);
        return res
          .status(500)
          .json({ error: "리프레시 토큰 처리 중 오류가 발생했습니다." });
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: "리프레시 토큰이 유효하지 않습니다." });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
}

export default passport;
