const express = require("express");
const router = express.Router();
const gigs = require("./gigsController");

router.get("/", gigs.returnAllGigs);
router.post("/", gigs.addNewGig);

module.exports = router;
