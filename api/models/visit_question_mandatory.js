const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const visit_question_mandatory = sequelize.define('visit_question_mandatory', {
        visit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'visit',
                key: 'id'
            }
        },
        question_mandatory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question_mandatory',
                key: 'id'
            }
        },
        answer: DataTypes.STRING
    }, {
    });
    return visit_question_mandatory;
}
