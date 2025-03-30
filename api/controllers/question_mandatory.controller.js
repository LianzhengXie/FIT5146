const db = require("../models");
const visitQuestionMandatoryDb = db.visit_question_mandatory;
const questionMandatoryDb = db.question_mandatory;

// Retrieve all answers from visit.
exports.getQuestionsMandatoryWithAnswers = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    let mandatoryQuestions = await questionMandatoryDb.findAll({
        include: [{
            model: db.visit_question_mandatory,
            required: false,
            where: { visit_id: visit_id },
            limit: 1,
        }],
    });
    // let mandatoryQuestions = await questionMandatoryDb.findAll({
    //     // attributes: ['id'],
    //     include: [{
    //         model: db.visit,
    //         required: false,
    //         where: { id: visit_id },
    //         // attributes: [],
    //         through: {
    //             attributes: ['answer'],
    //         },
    //     }],
    // });
    mandatoryQuestions = mandatoryQuestions.map(question_mandatory => {
        console.log('question_mandatory:', question_mandatory.visit_question_mandatories[0])
        const answer = question_mandatory.visit_question_mandatories.length > 0 ? question_mandatory.visit_question_mandatories[0].answer : null;
        return {
            id: question_mandatory.id,
            question_type: question_mandatory.question_type,
            text: question_mandatory.text,
            options: question_mandatory.options,
            answer: answer
        }
    })
    // console.log('mandatoryQuestions:', mandatoryQuestions)
    res.json(mandatoryQuestions);
};

exports.insertAnswerToQuestionsMandatory = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const { question_mandatory_id, answer } = req.body;
    const record = { visit_id, question_mandatory_id, answer }
    console.log('record_insertAnswerToQuestionMandatory:', record)
    const [row, created] = await visitQuestionMandatoryDb.upsert(record);
    // Keep only question_id and answer
    row.dataValues = { question_mandatory_id, answer }
    console.log('row_insertAnswerToQuestionMandatory:', row)
    res.json(row);
};

