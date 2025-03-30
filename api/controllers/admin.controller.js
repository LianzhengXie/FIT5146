const db = require("../models");
const patientDb = db.patient;

const { sendQuestionnaireToPatient, sendFollowUpToPatient } = require("../util/util.js");

// Send follow-up sms to patient
exports.send_follow_up_sms = async (req, res) => {
    // Get admin id from jwt token
    const adminId = req.admin.id;
    // Validate request
    if (!adminId) {
        res.status(400).send({
            message: "Unauthorized access"
        });
        return;
    }
    // Get patient mobile number and id
    const code = req.body.code;
    // Get patient id and mobile number from db.patient
    const patient = await patientDb.findOne({
        where: { code: code }
    });
    if (!patient) {
        res.status(400).send({
            message: "Patient not found"
        });
        return;
    }
    const patientId = patient.id;
    const mobileNumber = patient.mobile_number;
    // Send follow-up sms to patient
    const result = await sendFollowUpToPatient(mobileNumber, patientId);
    console.log('result', result);
};

// Send fill-questionnaire sms to patient
exports.sendQuestionnaireSms = async (req, res) => {
    // Get admin id from jwt token
    const adminId = req.admin.id;
    // Validate request
    if (!adminId) {
        res.status(400).send({
            message: "Unauthorized access"
        });
        return;
    }
    // Get patient mobile number and id
    const mobileNumber = req.body.mobile_number;
    // Get patient id and mobile number from db.patient
    let patient = await patientDb.findOne({
        where: { code: mobileNumber }
    });
    if (!patient) {
        // Create new patient
        const newPatient = {
            code: mobileNumber,
            mobile_number: mobileNumber,
        };
        patient = await patientDb.create(newPatient);
    }
    // Send follow-up sms to patient
    const result = await sendQuestionnaireToPatient(mobileNumber, patient.id);
    console.log('result', result);
};

