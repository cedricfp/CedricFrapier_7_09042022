const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const commentCtrl = require("../controllers/comment");

//Route pour ajouter un commentaire
router.post("/", auth, multer, commentCtrl.createComment);
//Route pour supprimler un commentaire
router.delete("/:id", auth, multer, commentCtrl.deleteComment);
//Route pour modifier un commentaire
router.put("/:id", auth, multer, commentCtrl.modifyComment);

module.exports = router;
