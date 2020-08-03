import * as crud from "./user.crud";

export async function getUserProfile(_, res) {
  try {
    const gigs = await crud.readAllGigs();
    res.json(gigs);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function addNewUser(req, res) {
  try {
    const data = req.body;
    const newGig = await crud.createUser(data);
    res.json(newGig);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function modifyUserProfile(req, res) {
  try {
    const data = req.body;
    const newGig = await crud.createNewGig(data);
    res.json(newGig);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}
