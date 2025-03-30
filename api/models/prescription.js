const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const prescription = sequelize.define("prescription", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        visit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'visit',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        category_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.SMALLINT,
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['visit_id', 'category_id', 'description']
            }
        ]
    });
    return prescription;
};