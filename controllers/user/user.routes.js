import express from "express";
import * as userController from "./user.controller";

const router = express.Router();

router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.modifyUserProfile);

export default router;
