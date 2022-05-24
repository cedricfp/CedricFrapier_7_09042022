const database = require("./database");

//Ajout d'un commentaire.
module.exports.addComment = async function (data) {
  return await database.query(
    "INSERT INTO `comments` (`userid`, `commentaire`, `datecreation`, `postid`) VALUES ( ?, ?, NOW(), ?)",
    [data.userId, data.content, data.postId]
  );
};

//Modifier un commentaire.
module.exports.modifyComment = async function (idComment, message) {
  await database.query(
    "UPDATE `comments` SET `commentaire` = '?' WHERE `comments`.`id` = ?;",
    [message, idComment]
  );
};

//Supprimer un commentaire.
module.exports.deleteComment = async function (idComment) {
  return await database.query(
    "DELETE FROM `comments` WHERE `comments`.`id` = ?;",
    [idComment]
  );
};

//Récupérer un commentaire.
module.exports.getOneComment = async function (idComment) {
  return await database.getOne("SELECT * FROM `comments` WHERE `id` = ?", [
    idComment,
  ]);
};
