const db = require("../../config/database");

async function returnAllGigs(_, res) {
  try {
    const gigs = await db.gigs.findMany();
    res.json(gigs);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

async function addNewGig(req, res) {
  try {
    const data = req.body;
    const newGig = await db.gigs.create({ data });
    res.json(newGig);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

module.exports = {
  returnAllGigs,
  addNewGig,
};
