const comment = require("../models/comment");

//Creer un commentaire
exports.createComment = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { content, postId } = req.body;
    await comment.addComment({ userId, content, postId });
    res.status(201).json({ msg: "commentaire ajouté" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Modifier un commentaire
exports.modifyComment = async (req, res, next) => {
  try {
    const verifComment = await comment.getOneComment(req.params.id);
    //Si il n'y a pas de commentaire ou que le commentaire a modifié n'est pas de l'auteur(même id)
    if (verifComment === null || verifComment.userid !== req.body.id) {
      return res
        .status(401)
        .json({ msg: "ce message ne peux pas être modifié" });
    }
    await comment.modifyComment(req.params.id, req.body.messsage);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const verifComment = await comment.getOneComment(req.params.id);
    //Si il n'y a pas de commentaire ou que le commentaire a modifié n'est pas de l'auteur(même id)
    if (verifComment === null || verifComment.userid !== req.body.id) {
      return res
        .status(401)
        .json({ msg: "ce message ne peux pas être supprimé" });
    }
    await comment.deleteComment(req.params.id);
  } catch (err) {
    res.status(500).json({ err });
  }
};
