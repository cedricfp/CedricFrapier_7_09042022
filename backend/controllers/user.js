require("dotenv").config();
const validator = require("validator").default;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.getMyInfo = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const userData = await userModel.findUserById(userId);
    res.status(200).json(userData);
  } catch (error) {
    // throw { message: "Cet utilisateur existe deja" };
    res.status(500).json({ message: "Cet utilisateur existe deja" });
  }
};

//Middleware de création de l'utilisateur
exports.signup = async (req, res, next) => {
  try {
    const { email, nom, password, prenom } = req.body;

    if (!validator.isStrongPassword(password))
      throw {
        message:
          "le mot de passe doit contenir au moins un chiffre, une lettre et doit contenir au moins 8 caractères",
      };
    if (!validator.isEmail(email))
      throw { message: "le format de l'email est incorrecte" };
    if (!validator.isAlpha(nom, "fr-FR"))
      throw { message: "veuillez saisir un nom correct" };
    if (!validator.isAlpha(prenom, "fr-FR"))
      throw { message: "veuillez saisir un nom correct" };

    //cryptage du mdp avec itération hash 10 tours
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await userModel.addUser(req.body);
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    // throw { message: "Cet utilisateur existe deja" };
    res.status(500).json({ message: "Cet utilisateur existe deja" });
  }
};

//Middleware d'authentificatio

exports.login = async (req, res, next) => {
  try {
    const userData = await userModel.findUserByEmail(req.body.email); // Recherche de l'utilisateur par son email dans la BDD.

    const valid = await bcrypt.compare(
      // On utilise la méthode compare de bcrypt pour comparer le MDP saisie et celui enegistré dans la BDD
      req.body.password,
      userData[0].password
    );
    if (!valid) throw { status: 401, msg: "Mot de passe incorrect !" };
    res.status(200).json({
      userId: userData[0].id,
      /* vérifier le token à chaque fois avec la fonction 
            sign (payload, clé secrete pour encodage, config expiration)*/
      token: jwt.sign(
        { userId: userData[0].id },
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
    console.log(req.params.id);
    const userData = await userModel.modifyUser(req.body, req.params.id);
    res.status(201).json({
      message: "Utilisateur modifié",
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.msg });
  }
};

//Middleware pour la supression d'un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    await userModel.deleteUser(req.params.id);

    res.status(201).json({ message: "Utilisateur supprimé !" });
  } catch (err) {
    return res.status(err.status).json({ error: err.msg });
  }
};
