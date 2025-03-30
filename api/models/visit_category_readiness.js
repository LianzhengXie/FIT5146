const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const visit_category_readiness = sequelize.define('visit_category_readiness', {
        visit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'visit',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.SMALLINT,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        readiness_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'readiness',
                key: 'id'
            }
        },
    }, {  
    });
    return visit_category_readiness;
}