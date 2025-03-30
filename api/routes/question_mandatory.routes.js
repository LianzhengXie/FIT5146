const qmController = require("../controllers/question_mandatory.controller.js");
const { validateToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Get answers from visit for category
router.get("/", validateToken, qmController.getQuestionsMandatoryWithAnswers);
// Upsert answer to visit_question_mandatory
router.post("/", validateToken, qmController.insertAnswerToQuestionsMandatory);

module.exports = router
