import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import hotelsRouter from "./routes/hotels.js";
import usersRouter from "./routes/users.js";
import roomsRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDB database.");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB Disconnected.");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected.");
});

app.use("/auth", authRouter);
app.use("/hotels", hotelsRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);

app.use((err, req, res, next) => {
  console.log("hitting error in index.js");
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    sucess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("connected to backend!!!", PORT);
});
