const vqController = require("../controllers/visit_question.controller.js");
const { validateToken, validateAdminToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Get answers from visit for category
router.get("/", validateToken, vqController.getAnswersFromVisit);

// Upsert answer to visit_question
router.post("/", validateToken, vqController.insertAnswerFromVisit);

// Get answers from visit for category
router.get("/categories", validateToken, vqController.getCategoriesAnsweredFromVisit);

// Get questions answered from visit
router.get("/questions", vqController.getQuestionsAnsweredForVisit);

module.exports = router