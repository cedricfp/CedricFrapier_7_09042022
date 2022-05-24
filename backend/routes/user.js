const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");

//Route création de l'utilisateur
router.post("/signup", userCtrl.signup);
//Route connexion de l'utilisateur
router.post("/login", userCtrl.login);
//Route de modification de l'utilisateur
router.put("/:id", auth, userCtrl.modifyUser);
//Route de suppression de l'utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
