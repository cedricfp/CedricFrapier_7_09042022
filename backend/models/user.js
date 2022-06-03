const database = require("./database");

//Ajouter un utilisateur dans la BDD.
module.exports.addUser = async function (user) {
  try {
    const res = await database.query(
      `INSERT INTO users(prenom, nom, email, password) VALUES ('${user.prenom}','${user.nom}','${user.email}','${user.password}')`
    );
  } catch (error) {
    throw {
      status: 500,
      msg: error + user,
    };
  }
};

//Recherche d'un utilisateur par son email.
module.exports.findUserByEmail = async function (email) {
  try {
    const res = await database.getOne(
      "SELECT * FROM `users` WHERE `email` = ?",
      [email]
    );
    // @ts-ignore
    if (res.length === 0)
      throw { status: 401, msg: "L'utilisateur n'existe pas" };
    return res;
  } catch (error) {
    throw {
      status: error.status || 500,
      msg: error.msg ? error.msg : error,
    };
  }
};

//Recherche d'un utilisateur par son Id.
module.exports.findUserById = async function (userId) {
  try {
    const res = await database.getOne(
      "SELECT email,id, nom, prenom, isAdmin FROM `users` WHERE `id` = ?",
      [userId]
    );
    if (res === null) throw { status: 401, msg: "L'utilisateur n'existe pas" };
    return res[0];
  } catch (error) {
    throw {
      status: error.status || 500,
      msg: error.msg ? error.msg : error,
    };
  }
};

//Modification du profil utilisateur. - UPDATE
module.exports.modifyUser = async function (user, id) {
  try {
    const res = await database.getOne(
      "UPDATE users SET prenom=?, nom=? WHERE id=?",
      [user.prenom, user.nom, id]
    );
    return res;
  } catch (error) {
    throw {
      status: 500,
      msg: error,
    };
  }
};

//Suppression d'un utilisateur.
module.exports.deleteUser = async function (id) {
  try {
    const res = await database.getOne("DELETE FROM users WHERE id = ?", [id]);
    return res;
  } catch (error) {
    throw {
      status: 500,
      msg: error,
    };
  }
};
