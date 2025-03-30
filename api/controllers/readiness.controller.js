const db = require("../models");
const readinessDb = db.readiness;
const visitCategoryReadinessDb = db.visit_category_readiness;

// Retrieve all Readiness options from DB.
exports.findAll = async (req, res) => {
    const readiness = await readinessDb.findAll()
    res.json(readiness);
};


// Retrieve all readiness answers from visit.
exports.getReadinessAnswersFromVisit = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const whereClause = {
        visit_id: visit_id
    };
    const readinessFromVisit = await visitCategoryReadinessDb.findAll({
        attributes: ['category_id', 'readiness_id'],
        where: whereClause
    });
    res.json(readinessFromVisit);
};

// Insert readiness answer to visit_category_readiness
exports.insertReadinessAnswer = async (req, res) => {
    // Get visit_id from jwt
    const visit_id = req.visit.id;
    const { category_id, readiness_id } = req.body;
    const record = { visit_id, category_id, readiness_id }
    const row = await visitCategoryReadinessDb.upsert(record);
    res.json(row);
};