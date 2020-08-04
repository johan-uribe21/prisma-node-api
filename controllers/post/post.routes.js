import express from "express";
import * as postController from "./post.controllers";

const router = express.Router();

router.get("/", postController.getUsersPosts);
router.post("/", postController.addNewPost);
router.put("/:id", postController.modifyUsersPost);
router.delete("/:id", postController.deleteUsersPost);

export default router;
