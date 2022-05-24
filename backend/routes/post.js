const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

module.exports = router;
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.getPostWithComments);
router.get("/", auth, postCtrl.getAllPosts);
