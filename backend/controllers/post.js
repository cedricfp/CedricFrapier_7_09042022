const postsModels = require("../models/post");

/**
 * [addPost description]
 *
 * @param   {Object}  req   [req description]
 * @param   {Object}  req.auth
 * @param   {String}  req.auth.userId
 * @param   {Object}  req.body
 * @param   {String}  req.body.postContent
 * @param   {Object}  req.file
 * @param   {String}  req.file.filename         Image de la publication.
 *
 * @param   {Object}  res   [res description]
 * @param   {Function}  next  [next description]
 *
 * @return  {Promise.<void>}        [return description]
 */
async function addPost(req, res, next) {
  try {
    const { postContent } = req.body;
    const content = postContent ? postContent : req.file.filename;
    await postsModels.addPost({
      utilisateur_id: req.auth.userId,
      message: content,
    });
    res.status(201).json({ msg: "message posté" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}
function getPostWithComments(req, res, next) {}
function getAllPostsWithTheirComments(req, res, next) {}
function updatePost(req, res, next) {}
function deletePost(req, res, next) {}
function getPost(req, res, next) {}

export { addPost };
