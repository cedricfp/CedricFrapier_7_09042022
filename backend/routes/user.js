const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//Route création de l'utilisateur
router.post("/signup", userCtrl.signup);
//Route connexion de l'utilisateur
router.post("/login", userCtrl.login);
//Route de modification de l'utilisateur
router.put("/:id", userCtrl.modifyUser);
//Route de suppression de l'utilisateur
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
