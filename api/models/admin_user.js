const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const admin_user = sequelize.define("admin_user", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        hooks: {
            beforeCreate: async (adminUser) => {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(adminUser.password, salt);
                adminUser.password = hashedPassword;
            },
            beforeUpdate: async (adminUser) => {
                if (adminUser.changed('password')) {
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = await bcrypt.hash(adminUser.password, salt);
                    adminUser.password = hashedPassword;
                }
            }
        }
    });

    return admin_user;
};