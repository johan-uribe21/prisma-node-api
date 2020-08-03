import db from "../../config/database";

export async function createUser(data) {
  return await db.user.create({ data });
}

export async function readByGoogleId(googleId) {
  return await db.user.findOne({ where: { googleId } });
}

export async function readById(id) {
  return await db.user.findOne({ where: { id } });
}

export async function findOrCreate(data) {
  let user = await readByGoogleId(data.id);
  if (user) {
    return user;
  }
  user = {
    givenName: data.name.givenName,
    familyName: data.name.familyName,
    googleId: data.id,
    photo: data.photos[0] ? data.photos[0].value : "",
    email: data.emails[0] ? data.emails[0].value : "",
  };
  return await createUser(user);
}
