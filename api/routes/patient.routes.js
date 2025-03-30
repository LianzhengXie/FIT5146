const patientsController = require("../controllers/patient.controller.js");

const router = require("express").Router();

// Retrieve all Patients
router.get("/latest", patientsController.getPatientsLatest);

// TODO: Finish implementation of these routes adding authorisation
// // Create a new Patient
// router.post("/", patientsController.create);


// // Retrieve all Patients
// router.get("/", patientsController.findAll);

// TODO: Implement these routes
// // Retrieve a single Patient with id
// router.get("/:id", patientsController.findOne);

// // Update a Patient with id
// router.put("/:id", patientsController.update);

// // Delete a Patient with id
// router.delete("/:id", patientsController.delete);

module.exports = router