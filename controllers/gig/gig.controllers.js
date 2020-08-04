import * as crud from "./gig.crud";

export async function returnAllGigs(req, res) {
  try {
    const gigs = await crud.readAllGigs();
    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export async function addNewGig(req, res) {
  try {
    const data = req.body;
    const newGig = await crud.createNewGig(data);
    res.json(newGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
