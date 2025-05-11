// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../lib/db"); // your sequelize instance

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "users"
});

module.exports = User;
