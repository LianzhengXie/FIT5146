const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const question = sequelize.define("question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        category_order: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        question_type: {
            type: DataTypes.ENUM,
            values: ['bool', 'rate', 'num', 'text', 'level', 'single_answer'],
            allowNull: false,
            defaultValue: 'rate'
        },
        extra_params: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        options: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['category_id', 'category_order']
            }
        ]
    });
    return question;
};
