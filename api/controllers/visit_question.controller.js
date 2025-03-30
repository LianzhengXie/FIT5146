const db = require("../models");
const visitQuestionDb = db.visit_question;
const questionDb = db.question;
const categoryDb = db.category;
const Op = db.Sequelize.Op;

// Retrieve all answers from visit.
exports.getAnswersFromVisit = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const whereClause = {
        visit_id: visit_id
    };
    const { category_id } = req.query;
    console.log('category_id:', category_id)

    console.log('whereClause:', whereClause)
    let answersFromVisit = await visitQuestionDb.findAll({
        attributes: ['question_id', 'answer'],
        where: whereClause,
        include: [{
            model: db.question,
            attributes: ['category_order'],
        }],
        order: [[db.question, 'category_order', 'ASC']]
    });
    // Remove category_order from answersFromVisit
    answersFromVisit = answersFromVisit.map(item => {
        return {
            question_id: item.question_id,
            answer: item.answer
        }
    })
    if (category_id) {
        const questions = await questionDb.findAll({
            attributes: ['id'],
            where: { category_id },
        });
        // Filter answers from visit by category
        answersFromVisit = answersFromVisit
                            .filter(item => {return questions.some(question => question.id === item.question_id);})
                            .map(item => {
                                return {
                                    question_id: item.question_id,
                                    answer: item.answer
                                }
                            });
    }
    res.json(answersFromVisit);
};

// Insert answer to visit_question
exports.insertAnswerFromVisit = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const { question_id, answer } = req.body;
    const record = { visit_id, question_id, answer }
    const [row, created] = await visitQuestionDb.upsert(record);
    // Keep only question_id and answer
    row.dataValues = { question_id, answer }
    console.log('row:', row)
    res.json(row);
};

// Retrieve categories answered from visit.
exports.getCategoriesAnsweredFromVisit = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const whereClause = {
        visit_id: visit_id
    };
    let categoriesAnsweredFromVisit = await visitQuestionDb.findAll({
        where: whereClause,
        include: [{
            model: db.question,
            include: [{
                model: db.category,
                attributes: ['id', 'name'],
            }],
        }],
        // raw: true, // Add this line to flatten the result
    });
    categoriesAnsweredFromVisit = categoriesAnsweredFromVisit.map(item => item['question']['category'])
    // remove repeated categories
    categoriesAnsweredFromVisit = categoriesAnsweredFromVisit.filter((item, index) => {
        const _item = JSON.stringify(item);
        return index === categoriesAnsweredFromVisit.findIndex(obj => {
            return JSON.stringify(obj) === _item;
        });
    });
    res.json(categoriesAnsweredFromVisit);
};

// Retrieve questions answered from visit.
exports.getQuestionsAnsweredForVisit = async (req, res) => {
    // Get visit_id from jwt
    const { visit_id } = req.query;
    if (!visit_id) {
        return res.status(400).send({ message: "visit_id is required" });
    }
    const whereClause = {
        visit_id: visit_id
    };
    let questionsAnsweredFromVisit = await visitQuestionDb.findAll({
        where: whereClause,
        attributes: ['answer'],
        include: [{
            model: db.question,
            attributes: ['id', 'question_type', 'text'],
            include: [{
                model: db.category,
                attributes: ['id'],
            }],
        }],
    });
    // Group by category
    questionsAnsweredFromVisit = questionsAnsweredFromVisit.reduce((acc, obj) => {
        const key = obj.question.category.id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
    // questionsAnsweredFromVisit = questionsAnsweredFromVisit.map(item => item['question'])
    res.json(questionsAnsweredFromVisit);
};