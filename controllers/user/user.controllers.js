import * as userCrud from "./user.crud";

export async function getUserProfile(req, res) {
  try {
    const profile = await userCrud.readProfile(req.user.id);
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function addNewProfile(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    const newProfile = await userCrud.createNewProfile(data, userId);
    res.json(newProfile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}

export async function modifyUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    const updatedUser = await userCrud.updateProfile(data, userId);
    res.json(updatedUser);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}
