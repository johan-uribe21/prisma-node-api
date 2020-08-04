import express from "express";
import * as userController from "./user.controllers";

const router = express.Router();

router.get("/profile", userController.getUserProfile);
router.post("/profile", userController.addNewProfile);
router.put("/profile", userController.modifyUserProfile);

export default router;
