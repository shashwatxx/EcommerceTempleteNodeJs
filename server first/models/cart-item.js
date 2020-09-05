const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const CartItem = sequelize.define(
  ("cartItem",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: Sequelize.INTEGER,
  })
);

module.exports = CartItem;
