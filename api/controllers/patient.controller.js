const db = require("../models");
const patientDb = db.patient;
const util = require("../util/util");

// Create a new Patient
// TODO: Add authorisation
exports.create = async (req, res) => {
    const { code } = req.body;
    // Validate request
    if (!code) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Check if code follows the format of a mobile number
    if (!util.isMobileNumber(code)) {
        res.status(400).send({
            message: "Invalid mobile number format! Enter in the format +51412345678"
        });
        return;
    }
    // Insert a patient to DB
    const newPatient = await patientDb.create({
        code: code,
        mobile_number: code,
    });
    res.json(newPatient);
};

// Retrieve all Patients from DB.
// TODO: Add authorisation
exports.findAll = async (req, res) => {
    const patients = await patientDb.findAll()
    res.json(patients);
};

// Retrieve latest visitors ordered by visit_dt_tm desc with pagination
exports.getPatientsLatest = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const patients = await patientDb.findAll({
        attributes: ['id', 'code', 'created_at'],
        include: [{
            model: db.visit,
            as: 'visits',
            attributes: ['id', 'visit_dt_tm'],
            order: [
                ['visit_dt_tm', 'DESC'],
            ],
            limit: 1,
        }, {
            model: db.reminder,
            as: 'reminders',
            attributes: ['id', 'start_date', 'end_date', 'frequency_days'],
            where: {
                deleted: false
            },
            limit: 1,
        }],
        limit: limit,
        offset: (page - 1) * limit
    })
    // Remove patients without visits and format response
    const formattedPatients = patients
        .filter(patient => patient.visits.length > 0)
        .map(patient => {
            const visit = patient.visits[0];
            return {
                id: patient.id,
                code: patient.code,
                created_at: patient.created_at,
                visit_id: visit.id,
                visit_dt_tm: visit.visit_dt_tm,
                // reminder: patient.reminders
                reminder: patient.reminders.length > 0 ? patient.reminders[0] : null,
            };
        });
    res.json(formattedPatients);
};
