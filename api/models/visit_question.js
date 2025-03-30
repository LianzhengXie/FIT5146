const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const visit_question = sequelize.define('visit_question', {
        visit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'visit',
                key: 'id'
            }
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question',
                key: 'id'
            }
        },
        answer: DataTypes.STRING
    }, {  
    });
    return visit_question;
}