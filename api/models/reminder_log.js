const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const reminder_log = sequelize.define("reminder_log", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reminder_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'reminder',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        prescription_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'prescription',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        sent_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        sent_media: {
            type: DataTypes.STRING,
        },
    });

    return reminder_log;
};
