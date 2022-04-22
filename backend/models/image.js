const database = require("./database");
const fs = require("fs");

// Récupérer l'image d'une publication.
module.exports.getImagePost = async function (id) {
  const data = await database.getOne("SELECT image from `posts` WHERE id=?", [
    id,
  ]);
  if (data.image === undefined) return null;
  return data.image.split("/images/")[1];
};

// Ajouter une image à une publication.
module.exports.addImagePost = async function (postId, image) {
  try {
    await database.query(
      "UPDATE `posts` SET `image` = '?' WHERE `posts`.`id` = ?",
      [image, postId]
    ); // Requête pour enregistrer.
  } catch (error) {
    throw error;
  }
};

// Modifier l'image d'une publication.
module.exports.modifyImagePost = async function (postId, image) {
  try {
    await database.query(
      "UPDATE `posts` SET `image` = '?' WHERE `posts`.`id` = ?",
      [image, postId]
    );
  } catch (error) {
    throw error;
  }
};

// Supprimer une image.
module.exports.deleteImagePost = function (filename) {
  fs.unlink(`images/${filename}`, (err) => {
    if (err) throw err;
    console.log("Image supprimée");
  });
};
