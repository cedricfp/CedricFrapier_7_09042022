require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

//Middleware de création de l'utilisateur
exports.signup = async (req, res, next) => {
  try {
    //cryptage du mdp avec itération hash 10 tours
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.addUser(req.body);
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Middleware d'authentificatio

exports.login = async (req, res, next) => {
  try {
    const userData = await userModel.findUserByEmail(req.body.email); // Recherche de l'utilisateur par son email dans la BDD.
    const valid = await bcrypt.compare(
      // On utilise la méthode compare de bcrypt pour comparer le MDP saisie et celui enegistré dans la BDD
      req.body.password,
      userData.password
    );
    if (!valid) throw { status: 401, msg: "Mot de passe incorrect !" };
    res.status(200).json({
      userId: userData.id,
      /* vérifier le token à chaque fois avec la fonction 
            sign (payload, clé secrete pour encodage, config expiration)*/
      token: jwt.sign(
        { userId: userData.id },
        process.env.SECRET,
        { expiresIn: "24h" } // Durée de validité du token.
      ),
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status).json({ error: err.msg });
  }
};

//Middleware pour la modification d'un utilisateur
exports.modifyUser = async (req, res, next) => {
  try {
    const userData = await User.modifyUser(req, req.body.userId);
    res.status(201).json({
      prenom: req.body.prenom,
      nom: req.body.nom,
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.msg });
  }
};

//Middleware pour la supression d'un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteUser(req.body.userId);

    res.status(201).json({ message: "Utilisateur supprimé !" });
  } catch (err) {
    return res.status(err.status).json({ error: err.msg });
  }
};
