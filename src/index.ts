import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./authRouter/Route";

dotenv.config();
const app = express();

app.use(express.urlencoded({ limit: "10MB" }));
app.use(express.json({ limit: "10MB" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`we are connected to port ${PORT}`);
});
