const db = require("../models");
const categoryDb = db.category;
const questionDb = db.question;
const Op = db.Sequelize.Op;

// Retrieve all Categories from DB.
exports.findAll = async (req, res) => {
    const categories = await categoryDb.findAll()
    res.json(categories);
};

// Find all questions from a category
exports.getCategoryQuestions = async (req, res) => {
    const { id } = req.params;
    const questionsForCategory = await questionDb.findAll({
        where: {
            category_id: id
        }
    });
    res.json(questionsForCategory);
};

// Find all questions from all categories
exports.getQuestionsPerCategory = async (req, res) => {
    const questionsPerCategory = await categoryDb.findAll({
        attributes: ['id', 'name', 'logo'],
        include: [{
            model: db.question,
            attributes: ['id', 'question_type', 'category_order', 'text'],
            order: [
            ['category_order', 'ASC'],
            ],
            required: true,
        }],
    });
    res.json(questionsPerCategory);
};