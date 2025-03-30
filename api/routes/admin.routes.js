const adminController = require("../controllers/admin.controller.js");

const { validateAdminToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Send follow-up sms to patient
router.post("/follow-up", validateAdminToken, adminController.send_follow_up_sms);
router.post("/fill-questionnaire", validateAdminToken, adminController.sendQuestionnaireSms)

module.exports = router
