import * as postCrud from "./post.crud";

export async function getUsersPosts(req, res) {
  try {
    const posts = await postCrud.readAllUserPosts(req.user.id);
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function addNewPost(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    const newProfile = await postCrud.createNewPost(data, userId);
    res.json(newProfile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}

export async function modifyUsersPost(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
    const postData = req.body;
    const updatedPost = await postCrud.updateUserPost(postData, postId, userId);
    res.json(updatedPost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}

export async function deleteUsersPost(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
    const deletedPost = await postCrud.deleteUsersPost(postId, userId);
    if (deletedPost) res.json({ message: "Post deleted sucessfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
