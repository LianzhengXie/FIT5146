const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    const reminder = sequelize.define("reminder", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // admin_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'admin_user',
        //         key: 'id',
        //         deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     }
        // },
        patient_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'patient',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        // prescription_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'prescription',
        //         key: 'id',
        //         deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     }
        // },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        frequency_days: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        hour_to_send: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 10
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['patient_id']
            }
        ]
    });

    return reminder;
};
