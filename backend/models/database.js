const mysql = require("mysql2/promise");

// create the connection to database
console.log(process.env.DB_USER, process.env.DB_DATABASE);

// Fonction pour récupérer un seul model.
async function getOne(sql, data = []) {
  const result = await query(sql, data);
  return result[0] || null;
}

// Fonction pour toutes les autres requêtes.
async function query(sql, data = []) {
  let conn;
  try {
    conn = await mysql.createConnection({
      //host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      //connectionLimit: 5,
    });
    console.log("connection reussie");
    const response = await conn.execute(sql, data);
    console.log("requete effectuee");
    if (response.meta !== undefined) delete response.meta;
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.destroy(); //release to pool
  }
}

module.exports = {
  getOne,
  query,
};
