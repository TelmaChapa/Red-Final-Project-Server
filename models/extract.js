const { DataTypes } = require("sequelize");
const db = require("../db");

const Extract = db.define(
    "extract",
    {
        beantype: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        beanamount: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        alcoholtype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        proof: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alcoholamount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        container: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        startdate: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        enddate: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        overallresult: {
            type: DataTypes.STRING(3500),
        },
    });

module.exports = Extract;