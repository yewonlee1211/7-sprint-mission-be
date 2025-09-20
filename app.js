import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productController from "./controllers/product.js";
import articleController from "./controllers/article.js";
import productCommentController from "./controllers/productComment.js";
import articleCommentController from "./controllers/articleComment.js";
import productHeartController from "./controllers/productHeart.js";
import articleHeartController from "./controllers/articleHeart.js";
import userController from "./controllers/user.js";
import passport from "./config/passport.js";

dotenv.config();

const app = express();

app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// 디버깅 미들웨어 (응답 중복 전송 문제로 인해 주석 처리)
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    console.log("[DEBUG][json]", req.method, req.url, body);
    return originalJson.call(this, body);
  };

  const originalSend = res.send;
  res.send = function (body) {
    console.log("[DEBUG][send]", req.method, req.url, body);
    return originalSend.call(this, body);
  };

  next();
});

// 라우터 등록
app.use("/product", productController);

app.use("/article", articleController);

app.use("/productComment", productCommentController);

app.use("/articleComment", articleCommentController);

app.use("/productHeart", productHeartController);

app.use("/articleHeart", articleHeartController);

app.use("/auth", userController);

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
