import express from "express";
import {
  addHotel,
  countByCity,
  countByType,
  deleteHotel,
  getHotel,
  getallHotels,
  hotelRooms,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); 

router.post("/", verifyAdmin, addHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getallHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", hotelRooms);

export default router;
