const prescriptionController = require("../controllers/prescription.controller.js");
const { validateAdminToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Get all Prescriptions For Visit
router.get("/", validateAdminToken, prescriptionController.getPrescriptionsForVisit);

// Get all Prescriptions For Patient
router.get("/history", validateAdminToken, prescriptionController.getPrescriptionHistory);

// Get all Prescriptions For Patient
router.get("/all", prescriptionController.getPrescriptionsForPatient);

// Insert New Prescription For Visit
router.post("/", validateAdminToken, prescriptionController.insertNewPrescriptionForVisit);

// Delete Prescription For Visit
router.delete("/", validateAdminToken, prescriptionController.deletePrescriptionForVisit);

// Update Prescription
router.put("/", prescriptionController.updatePrescription);

// Insert Batch of Prescriptions For Visit
router.post("/", validateAdminToken, prescriptionController.insertBatchPrescriptionsForVisit);

module.exports = router