const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here

const User = db.define(
  "user",
  {
    firstname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
});

module.exports = User;
