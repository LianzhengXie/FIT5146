// TODO: Add visit controller logic here
const db = require("../models");
const patientDb = db.patient;
const Op = db.Sequelize.Op;

// Create a new Patient
exports.create = async (req, res) => {
    const { code } = req.body;
    // Validate request
    if (!code) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Insert a patient to DB
    const newPatient = await patientDb.create({
        code: code,
    });
    res.json(newPatient);
};

// Retrieve all Patients from DB.
exports.findAll = async (req, res) => {
    const patients = await patientDb.findAll()
    res.json(patients);
};

// Find a single Patient with an id
exports.findOne = (req, res) => {

};

// Update a Patient by the id in the request
exports.update = (req, res) => {

};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {

};