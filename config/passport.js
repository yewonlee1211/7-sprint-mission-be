import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../middlewares/passport/jwtStrategy.js";
import jwt from "jsonwebtoken";
import { createToken } from "../services/user.js";

// 로그인 했는지 검사
export async function authLoginMiddleware(req, res, next) {
  passport.authenticate(accessTokenStrategy, { session: false })(
    req,
    res,
    next
  );
}

// 리프레쉬 토큰 검사
export async function authRefreshMiddleware(req, res, next) {
  passport.authenticate(refreshTokenStrategy, { session: false })(
    req,
    res,
    next
  );
}

export default passport;
