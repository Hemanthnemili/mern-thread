import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./database/db.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
