
const categoryController = require("../controllers/category.controller.js");
const { validateToken, validateAdminToken } = require("../middleware/auth.js");

const router = require("express").Router();

// Retrieve all Categories
router.get("/", categoryController.findAll);

// Retrieve Questions for Category
router.get("/:id/questions", validateToken, categoryController.getCategoryQuestions);

// Retrieve All Questions per Category
router.get("/questions", validateAdminToken, categoryController.getQuestionsPerCategory);

module.exports = router