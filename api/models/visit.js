const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const visit = sequelize.define("visit", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'patient',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        visit_dt_tm: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        registration_dt_tm: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['patient_id', 'visit_dt_tm']
            }
        ]
    });
    return visit;
};
