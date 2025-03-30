const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const question = sequelize.define("question_mandatory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_type: {
            type: DataTypes.ENUM,
            values: ['single_answer', 'category_rank'],
            allowNull: false,
            defaultValue: 'single_answer'
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        options: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['text']
            }
        ]
    });
    return question;
};
