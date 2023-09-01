import express from "express";
import {
  deleteUser,
  getUser,
  getallUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/verification", verifyToken, (req, res, next) => {
  res.send("you are authenticated!");
});

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getallUsers);

export default router;
