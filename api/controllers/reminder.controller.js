const db = require("../models");
const reminderDb = db.reminder;

exports.insertReminder = async (req, res) => {
    // Get admin id from jwt token
    const admin_id = req.admin.id;
    // Validate request
    if (!admin_id) {
        res.status(400).send({
            message: "Unauthorized access"
        });
        return;
    }
    const { patient_id, start_date, end_date, frequency_days } = req.body;
    const record = { patient_id, start_date, end_date, frequency_days, deleted: false }
    // Remove end_date -> in future could be an end_date of reminder
    delete record.end_date;
    const [row, _] = await reminderDb.upsert(record);
    // Keep only question_id and answer
    row.dataValues = { id: row.id, patient_id, start_date, end_date, frequency_days }
    res.json(row);
};

exports.deleteReminderForPatient = async (req, res) => {
    // Get admin id from jwt token
    const admin_id = req.admin.id;
    // Validate request
    if (!admin_id) {
        res.status(400).send({
            message: "Unauthorized access"
        });
        return;
    }
    const { patient_id } = req.body;
    // Set deleted to true
    const patient_reminder = await reminderDb.findOne({ where: { patient_id } });
    patient_reminder.update({ deleted: true });
    res.json({ success: true });
}
