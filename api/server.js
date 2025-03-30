const app = require("./app");
const db = require("./models");
const Op = db.Sequelize.Op;

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Drop and re-sync db.");
        // Set port, listen for requests
        const PORT = process.env.APP_PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })

// Cron job to send reminders
const cron = require('node-cron');
const { sendFollowUpToPatient } = require("./util/util");
cron.schedule('0 * * * *', () => {
    // Get current hour
    const now = new Date();
    const current_hour = now.getHours();
    // Get all reminders that are not deleted
    db.reminder.findAll({
        where: {
            // start_date greated than or equal to now
            start_date: {
                [Op.lte]: now
            },
            // end_date less than or equal to now or null
            end_date: {
                [Op.or]: [
                    { [Op.gte]: now },
                    { [Op.is]: null }
                ]
            },
            deleted: false,
            hour_to_send: current_hour
        },
        include: [{
            model: db.patient,
            as: 'patient',
            attributes: ['id', 'mobile_number']
        }]
    }).then(reminders => {
        reminders.forEach(reminder => {
            // Send reminder
            const mobileNumber = reminder.patient.mobile_number;
            const patientId = reminder.patient.id;
            sendFollowUpToPatient(mobileNumber, patientId);
        });
    });
});
