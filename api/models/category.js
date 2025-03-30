const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const category = sequelize.define("category", {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        logo: {
            type: DataTypes.STRING
        },
    });
    return category;
};