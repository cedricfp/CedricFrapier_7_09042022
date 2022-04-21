const database = require("./database");

//Ajout d'une publication.
module.exports.addPost = async function (data) {
  return await database.query(
    "INSERT INTO `posts` (`utilisateur_id`, `message`,  `datecreation`) VALUES (?, ?, ?)",
    [data.utilisateur_id, data.message]
  );
};

// Récupération d' une publication avec ses commentaires.
module.exports.getPostWithComments = async function (idPost) {
  return await database.query(
    "SELECT * FROM posts JOIN comments ON comments.id_post = posts.id WHERE posts.id=?",
    [idPost]
  );
};

// Récuperation de toutes les publications avec leurs commentaires.
module.exports.getAllPostsWithTheirComments = async function () {
  return await database.query(
    "SELECT posts.message, posts.utilisateur_id AS messageAuthor, comments.utilisateur_id AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id"
  );
};

//Modifier un post
module.exports.updatePost = async function (message, idPost) {
  return await database.query(
    "UPDATE `posts` SET `message` = '?' WHERE `posts`.`id` = ?;",
    [message, idPost]
  );
};

//Supprimer un post
module.exports.deletePost = async function (idPost) {
  return await database.query("DELETE FROM `posts` WHERE `posts`.`id` = ?;", [
    idPost,
  ]);
};

//Selection du post
module.exports.getPost = async function (idPost) {
  return await database.query("SELECT * FROM `posts` WHERE `id`=?", [idPost]);
};
