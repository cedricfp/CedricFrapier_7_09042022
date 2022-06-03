const postsModels = require("../models/post");
const userModels = require("../models/user");
const auth = require("../middlewares/auth");
const fs = require("fs");

//middleware de création du post
exports.createPost = async (req, res, next) => {
  try {
    if (!req.body.content) {
      res.status(400).send({
        message: "Votre post ne contient rien, exprimez vous !",
      });
      return;
    }
    if (req.file) {
      await postsModels.addPost({
        utilisateur_id: req.auth.userId,
        message: req.body.content,
        image: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
      });
    } else {
      await postsModels.addPost({
        utilisateur_id: req.auth.userId,
        message: req.body.content,
        image: null,
      });
    }
    res.status(201).json({ message: "Publication créée !" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//middleware de modification du post
exports.updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw { status: 400, msg: "manque id" };
    const content = req.body.content;
    if (!id) throw { status: 400, msg: "manque le contenu du message" };

    await postsModels.updatePost(content, id);
    res.status(201).json({ message: "Publication modifiée !" });
  } catch (err) {
    const error = err.msg ? { msg: err.msg } : err;
    res.status(err.status || 500).json(error);
  }
};

//middleware de suppression du post
exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw { status: 400, msg: "manque id" };

    await postsModels.deletePost(id);
    res.status(201).json({ message: "Publication supprimée !" });
  } catch (err) {
    const error = err.msg ? { msg: err.msg } : err;
    res.status(err.status || 500).json(error);
  }
};

//middleware pour séléctionner un post avec ses commentaires
exports.getPostWithComments = async (req, res, next) => {
  try {
    const id = req.params.id;
    await postsModels.getPostWithComments(id);
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ err });
  }
};

//middleware pour prendre tout les posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const [allPosts] = await postsModels.getAllPosts();
    const newPostswithComments = [];
    for await (const p of allPosts) {
      const [comments] = await postsModels.getPostWithComments(p.id);
      p.comments = comments;
      newPostswithComments.push(p);
    }

    res.status(200).json(newPostswithComments);
  } catch (err) {
    res.status(500).json({ err });
  }
};
