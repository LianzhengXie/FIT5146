const db = require("../models");

const DATA_PATH = 'data/'
const { loadCsv } = require('../util/util')

module.exports = async () => {
    // Setup admin user json object
    global.adminData = {
        username: 'admin',
        password: 'admin1234'
    }
    // Setup patient user json object
    global.patientData = {
        id: '2ac3f5d6-6095-4943-aabc-fd4e6f0d6ee9',
        code: '123'
    }
    await db.sequelize.sync({ force: true, logging: false })
    // Create an admin user
    await db.admin_user.create(global.adminData)
    // Create a patient user
    await db.patient.create(global.patientData)
    // Load categories to db
    const categoryData = await loadCsv(DATA_PATH + 'categories.csv', true)
    await db.category.bulkCreate(categoryData)
    // Load questions to db
    const questionData = await loadCsv(DATA_PATH + 'questions.csv', true)
    await db.question.bulkCreate(questionData)
    // Load readiness to db
    const readinessData = await loadCsv(DATA_PATH + 'readiness.csv', true)
    await db.readiness.bulkCreate(readinessData)
}