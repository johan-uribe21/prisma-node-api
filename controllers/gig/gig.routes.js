import express from "express";
import * as gigController from "./gig.controllers";

const router = express.Router();

router.get("/", gigController.returnAllGigs);
router.post("/", gigController.addNewGig);

export default router;
