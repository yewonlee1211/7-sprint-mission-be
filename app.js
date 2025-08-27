import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product/product.js";
import articleRouter from "./routes/article/article.js";
import pCommentRouter from "./routes/pComment/pComment.js";
import aCommentRouter from "./routes/aComment/aComment.js";
import pHeartRouter from "./routes/PHeart/PHeart.js";
import aHeartRouter from "./routes/AHeart/AHeart.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 라우터 등록
app.use("/product", productRouter);

app.use("/article", articleRouter);

app.use("/pComment", pCommentRouter);

app.use("/aComment", aCommentRouter);

app.use("/pHeart", pHeartRouter);

app.use("/aHeart", aHeartRouter);

app.use("/auth", userRouter);

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
