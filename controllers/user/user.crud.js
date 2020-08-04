import db from "../../config/database";

/**
 * Find uesr by google id
 * @param {object} userData - User data object containing given name, family name, email, and photo
 */
export async function createUser(data) {
  return await db.user.create({ data });
}

/**
 * Find uesr by google id
 * @param {number} googleId - Google ID
 */
export async function readByGoogleId(googleId) {
  return await db.user.findOne({ where: { googleId } });
}

/**
 * Find uesr by user id
 * @param {number} id - useId
 */
export async function readById(id) {
  return await db.user.findOne({ where: { id } });
}

/**
 * Find user by google id or create new user
 * @param {object} data - data object containing google id and user params
 */
export async function findOrCreateUser(data) {
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

/**
 * Create a new profile associated with a user
 * @param {object} data - profile data - fields include bio
 * @param {number} userId - id of the user
 */
export async function createNewProfile(data, userId) {
  return await db.profile.create({
    data: {
      ...data,
      user: {
        connect: { id: parseInt(userId) },
      },
    },
  });
}

/**
 * Update profile associated with a user
 * @param {object} data - profile data - fields include bio
 * @param {number} userId - id of the user
 */
export async function updateProfile(data, userId) {
  return await db.user
    .update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: data,
            update: data,
          },
        },
      },
    })
    .profile();
}

/**
 * Read profile associated with user
 * @param {number} userId - id of the user
 */
export async function readProfile(userId) {
  return await db.user.findOne({ where: { id: parseInt(userId) } }).profile();
}
