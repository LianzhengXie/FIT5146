const reminderController = require("../controllers/reminder.controller.js");
const { validateAdminToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Insert New reminder For Patient
router.post("/", validateAdminToken, reminderController.insertReminder);
router.delete("/", validateAdminToken, reminderController.deleteReminderForPatient);

module.exports = router
