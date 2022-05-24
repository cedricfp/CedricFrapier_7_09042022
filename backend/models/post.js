const database = require("./database");

//Ajout d'une publication.
/**
 * [addPost description]
 *
 * @param   {Object}  data  [data description]
 * @param   {Number}  data.utilisateur_id
 * @param   {String}  data.message
 * @param   {String}  data.image
 *
 * @return  {Object}        [return description]
 */
module.exports.addPost = async function (data) {
  return await database.query(
    "INSERT INTO `posts` (`userid`, `message`,  `datecreation`, `image`) VALUES (?, ?, NOW(), ?)",
    [data.utilisateur_id, data.message, data.image]
  );
};

// Récupération d' une publication avec ses commentaires.
module.exports.getPostWithComments = async function (idPost) {
  return await database.query(
    "SELECT commentaire, comments.id id, users.prenom prenom, users.nom nom FROM posts JOIN comments ON comments.postid = posts.id JOIN users ON comments.userid = users.id WHERE posts.id=?",
    [idPost]
  );
};

// Récuperation de toutes les publications avec leurs commentaires.
module.exports.getAllPosts = async function () {
  return await database.query(
    "SELECT p.id,u.nom, u.prenom,p.image,p.datecreation,p.message FROM posts p join users u on u.id = p.userid ORDER BY p.datecreation DESC;"
  );
};

/**
 * Modifier un post
 *
 * @param   {String}  message  [message description]
 * @param   {String}  idPost   [idPost description]
 *
 * @return  {Object}           [return description]
 */
module.exports.updatePost = async function (message, idPost) {
  return await database.query(
    "UPDATE `posts` SET `message` = ? WHERE `posts`.`id` = ?",
    [message, idPost]
  );
};

/**
 * Supprimer un post
 *
 * @param   {String}  idPost  [idPost description]
 *
 * @return  {Object}          [return description]
 */
module.exports.deletePost = async function (idPost) {
  return await database.query("DELETE FROM `posts` WHERE `posts`.`id` = ?;", [
    idPost,
  ]);
};

//Selection du post
module.exports.getPost = async function (idPost) {
  return await database.query("SELECT * FROM `posts` WHERE `id`=?", [idPost]);
};
