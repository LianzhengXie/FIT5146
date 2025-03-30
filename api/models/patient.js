const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const patient = sequelize.define("patient", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        code: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        mobile_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        }
    });

    return patient;
};
