
const readinessController = require("../controllers/readiness.controller.js");
const { validateToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Retrieve all Readiness options
router.get("/", readinessController.findAll);

// Get answers from visit for category
router.get("/answer", validateToken, readinessController.getReadinessAnswersFromVisit);

// Upsert answer to visit_question
router.post("/answer", validateToken, readinessController.insertReadinessAnswer);

module.exports = router