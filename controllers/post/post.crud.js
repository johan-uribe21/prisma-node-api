import db from "../../config/database";

/**
 * Create new post associated with a user
 * @param {object} postData - post data object
 * @param {number} userId - User id
 */
export async function createNewPost(postBody, userId) {
  const { business, rating, review, communities } = postBody;
  const currentCommunities = await db.community.findMany({
    where: { name: { in: communities } },
  });

  const newCommuniuties = communities.filter(
    (e) => !currentCommunities.map((e) => e.name).includes(e)
  );

  await createCommunities(newCommuniuties);

  const payload = communities.map((e) => ({ name: e }));

  return db.post.create({
    data: {
      business,
      rating,
      review,
      author: {
        connect: { id: userId },
      },
      communities: {
        connect: payload,
      },
    },
  });
}

/**
 * Find user by user id
 * @param {number} id - userId
 */
export async function readAllUserPosts(id) {
  return await db.post.findMany({ where: { id } });
}

/**
 * Create new community
 * @param {string} name - ommunity name
 */
export async function createCommunity(name) {
  return await db.community.create({ data: { name } });
}

/**
 * Create new communities from an array of names
 * @param {array} names - array of community names
 */
export async function createCommunities(names) {
  return Promise.all(
    names.map((e) => db.community.create({ data: { name: e } }))
  );
}

/**
 * Read post
 * @param {number} postId
 */
export async function readPost(postId) {
  return db.post.findOne({ where: { id: postId } });
}

/**
 * Read post
 * @param {number} postId
 */
export async function readPostWithCommunities(postId) {
  return db.post.findOne({
    where: { id: postId },
    include: { communities: true },
  });
}

/**
 * Read posts author
 * @param {number} postId
 */
export async function readPostsAuthor(postId) {
  return db.post.findOne({ where: { id: postId } }).author();
}

/**
 * Update a users post, verifying the post belongs to the user
 * @param {object} postData - object holding post data
 * @param {number} postId - post id
 * @param {number} userId - uesr id
 */
export async function updateUserPost(postData, postId, userId) {
  const author = await readPostsAuthor(postId);
  const post = await readPostWithCommunities(postId);
  const { business, rating, review, communities } = postData;
  const currentCommunities = post.communities.map((e) => e.name);

  const communitiesToAdd = communities.filter(
    (e) => !currentCommunities.includes(e)
  );

  const communitiesToRemove = currentCommunities.filter(
    (e) => !communities.includes(e)
  );

  if (author.id === userId) {
    if (!communitiesToAdd.length && !communitiesToRemove.length) {
      return db.post.update({
        where: { id: postId },
        data: { business, rating, review },
      });
    } else {
      return updateOrCreateCommunitiesWithPost(
        postData,
        postId,
        communitiesToAdd
      );
    }
  }
  throw "Unauthorized attempt to edit a post. Users may only edit their own posts.";
}

/**
 * check if any of the diff communities do not exist.
 * If they dont exist, create them and associate them with this post while updating post
 * @param {object} postBody - post data object
 * @param {number} postId - User id
 * @param {array} communitiesToAdd - Array of community names to be connected to post
 * @param {array} communitiesToRemove - Array of community names to be disconnected from post
 */
export async function updateOrCreateCommunitiesWithPost(
  postBody,
  postId,
  communitiesToAdd
) {
  const { business, rating, review, communities } = postBody;
  const currentCommunities = await db.community.findMany({
    where: { name: { in: communitiesToAdd } },
  });

  const newCommuniuties = communitiesToAdd.filter(
    (e) => !currentCommunities.map((e) => e.name).includes(e)
  );

  await createCommunities(newCommuniuties);

  const connectPayload = communities.map((e) => ({ name: e }));

  return db.post.update({
    where: { id: postId },
    data: {
      business,
      rating,
      review,
      communities: {
        set: connectPayload,
      },
    },
  });
}

export async function deleteUsersPost(postId, userId) {
  const author = await readPostsAuthor(postId);

  if (author.id === userId) {
    return db.post.delete({ where: { id: postId } });
  }
  throw "User may only delete their own posts.";
}
