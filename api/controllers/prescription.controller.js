const { Op } = require("sequelize");
const db = require("../models");
const prescriptionDb = db.prescription;

// Retrieve all prescriptions for visit.
exports.getPrescriptionsForVisit = async (req, res) => {
    // Get visit_id from request body
    const visit_id = req.query.visit_id;
    if (!visit_id) {
        return res.status(400).send({ message: "visit_id is required" });
    }
    const whereClause = {
        visit_id: visit_id
    };
    const prescriptionsForVisit = await prescriptionDb.findAll({
        attributes: ['id', 'category_id', 'description', 'answer'],
        where: whereClause,
        order: [['id', 'ASC']]
    });
    res.json(prescriptionsForVisit);
};
// Retrieve prescription history for Patient.
exports.getPrescriptionHistory = async (req, res) => {
    // Get visit_id from request query
    const visit_id = req.query.visit_id;
    if (!visit_id) {
        return res.status(400).send({ message: "visit_id is required" });
    }
    // Get patient from visit_id
    const visit = await db.visit.findByPk(visit_id);
    if (!visit) {
        return res.status(400).send({ message: `visit_id "${visit_id}" not found` });
    }
    const whereClause = {
        patient_id: visit.patient_id
    };
    const exceptToday = req.query.exceptToday || true;
    if (exceptToday) {
        // Get all prescriptions except for today at time 00:00:00
        const today = new Date();
        // Sets 00:00:00 time in local timezone 
        // e.g. for time 2024-01-02 16:15 (AEST) -> 2024-01-02 00:00 (AEST) -> 2024-01-01T13:00:00.000Z
        today.setHours(0, 0, 0, 0);
        console.log('todayController:', today)
        whereClause.visit_dt_tm = { [Op.lt]: today }
    }
    const prescriptionsForPatient = await prescriptionDb.findAll({
        attributes: ['id', 'category_id', 'description', 'answer'],
        include: [{
            model: db.visit,
            attributes: ['id', 'visit_dt_tm'],
            where: whereClause,
        }],
        order: [['id', 'DESC']]
    });
    // Group by visit.visit_dt_tm
    const groupedPrescriptionsForPatient = prescriptionsForPatient.reduce((acc, item) => {
        const date = new Date(item.visit.visit_dt_tm);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(item);
        return acc;
    }, {});
    res.json(groupedPrescriptionsForPatient);
};
// Retrieve all prescriptions for patient.
exports.getPrescriptionsForPatient = async (req, res) => {
    // Get patient_id from request body
    const patient_id = req.query.patient_id;
    if (!patient_id) {
        return res.status(400).send({ message: "patient_id is required" });
    }
    const whereClause = {
        patient_id: patient_id
    };
    const visitsForPatient = await db.visit.findAll({
        attributes: ['id'],
        where: whereClause
    });
    const prescriptionsForPatient = await prescriptionDb.findAll({
        attributes: ['id', 'category_id', 'description', 'answer'],
        include: [{
            model: db.visit,
            attributes: ['id', 'visit_dt_tm'],
            where: whereClause,
        }],
        where: {
            visit_id: {
                [Op.in]: visitsForPatient.map(visit => visit.id)
            }
        },
        order: [['id', 'DESC']]
    });
    // Group by visit.visit_dt_tm
    const groupedPrescriptionsForPatient = prescriptionsForPatient.reduce((acc, item) => {
        const date = new Date(item.visit.visit_dt_tm);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(item);
        return acc;
    }, {});
    res.json(groupedPrescriptionsForPatient);
};

// Insert new prescription for visit
exports.insertNewPrescriptionForVisit = async (req, res) => {
    // Insert new prescription
    const { visit_id, category_id, description } = req.body;
    if (!visit_id || !category_id || !description) {
        return res.status(400).send({ message: "visit_id, category_id, and description are required" });
    }
    const result = await prescriptionDb.create({ visit_id, category_id, description });
    console.log('result:', result)
    res.json(result);
};
// Delete prescription for visit
exports.deletePrescriptionForVisit = async (req, res) => {
    // Delete prescription
    const { prescription_id } = req.body;
    if (!prescription_id) {
        return res.status(400).send({ message: "prescription_id is required" });
    }
    const rowsDeleted = await prescriptionDb.destroy({ where: { id: prescription_id } });
    console.log('rowsDeleted:', rowsDeleted)
    if (rowsDeleted === 0) {
        return res.status(400).send({ message: "prescription_id not found" });
    } else if (rowsDeleted === 1) {
        res.json({
            id: prescription_id,
        });
    }

}
// Update prescription
exports.updatePrescription = async (req, res) => {
    const { id, answer } = req.body;
    if (!id || !answer) {
        return res.status(400).send({ message: "id and answer are required" });
    }
    const prescription = await prescriptionDb.findByPk(id);
    if (!prescription) {
        return res.status(400).send({ message: "id not found" });
    }
    const result = await prescription.update({ answer });
    res.json(result);
}

// Insert new prescriptions for visit
exports.insertBatchPrescriptionsForVisit = async (req, res) => {
    // Get visit_id from request body { visit_id, prescriptions: [{id, visit_id, category_id, description}, ...] }
    const visit_id = req.body.visit_id;
    const whereClause = {
        visit_id: visit_id
    };
    // Delete all prescriptions for visit
    await prescriptionDb.destroy({ where: whereClause });
    // Insert all prescriptions for visit
    const prescriptions = req.body.prescriptions;
    const result = await prescriptionDb.bulkCreate(prescriptions);
    res.json(result);
};
