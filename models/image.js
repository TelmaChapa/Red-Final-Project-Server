const { DataTypes } = require("sequelize");
const db = require("../db");

const Image = db.define(
    "image",
    {

        imageupload: {
            type: DataTypes.STRING(3500),
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        // public: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        // },
    });

module.exports = Image;