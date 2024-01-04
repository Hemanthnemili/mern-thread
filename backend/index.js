import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./database/db.js";

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
