const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-learning", "root", "password", {
  dialect: "mysql",
});
module.exports = sequelize;
//for using mysql2
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-learning",
//   password: "password",
// });

// module.exports = pool.promise();
