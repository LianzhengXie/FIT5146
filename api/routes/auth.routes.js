const loginController = require("../controllers/auth.controller.js");

const router = require("express").Router();

router.post("/login", loginController.loginPatient);
router.post("/login-admin", loginController.loginAdmin);
router.post("/login-with-id", loginController.loginPatientWithId);

module.exports = router
