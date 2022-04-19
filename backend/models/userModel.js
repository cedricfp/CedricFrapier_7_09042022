const { query } = require("./database");

async function getAllUsers() {
  //return;
  try {
    const rows = await query("SELECT * from utilisateur");
    // rows: [ {val: 1}, meta: ... ]
    console.log(rows);

    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    console.error(err);
  } finally {
    //if (connection) connection.end(); //release to pool
  }
}

module.exports = {
  getAllUsers,
};
