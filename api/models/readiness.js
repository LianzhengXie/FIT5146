const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const readiness = sequelize.define("readiness", {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        option: {
            type: DataTypes.STRING,
            unique: true
        },
    });
    return readiness;
};