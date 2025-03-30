// 'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Get DB config from config.js
const env = process.env.NODE_ENV || 'development';
const dBconfig = require("../config/config.js")[env];

// Create Sequelize instance
const sequelize = new Sequelize(dBconfig);

// Create db object
const db = {};
// Import all models in this directory
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

// Associate all models in db
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.patient = require("./patient.js")(sequelize);
// db.visit = require("./visit.js")(sequelize);
// db.category = require("./category.js")(sequelize);
// db.question = require("./question.js")(sequelize);
// db.question_answer = require("./question_answer.js")(sequelize);
// db.prescription = require("./prescription.js")(sequelize);

// Super Many-to-Many relationship between visit + question
db.visit.belongsToMany(db.question, {
    through: db.visit_question,
    foreignKey: 'visit_id'
});
db.question.belongsToMany(db.visit, {
    through: db.visit_question,
    foreignKey: 'question_id'
});

db.visit_question.belongsTo(db.question, { foreignKey: 'question_id' });
db.question.hasMany(db.visit_question, { foreignKey: 'question_id' });

db.category.hasMany(db.question, { foreignKey: 'category_id' });
db.question.belongsTo(db.category);

db.visit.hasMany(db.prescription, { foreignKey: 'visit_id' });
db.prescription.belongsTo(db.visit);

db.patient.hasMany(db.visit, { foreignKey: 'patient_id' });
db.visit.belongsTo(db.patient);

// Super Many-to-Many relationship between visit + category + readiness
db.visit.belongsToMany(db.category, {
    through: db.visit_category_readiness,
    foreignKey: 'visit_id'
});
db.category.belongsToMany(db.visit, {
    through: db.visit_category_readiness,
    foreignKey: 'category_id'
});

db.visit.belongsToMany(db.question_mandatory, {
    through: db.visit_question_mandatory,
    foreignKey: 'visit_id'
});
db.question_mandatory.belongsToMany(db.visit, {
    through: db.visit_question_mandatory,
    foreignKey: 'question_mandatory_id'
});
db.question_mandatory.hasMany(db.visit_question_mandatory, { foreignKey: 'question_mandatory_id' });
db.visit_question_mandatory.belongsTo(db.question_mandatory);

db.reminder.hasMany(db.reminder_log, { foreignKey: 'reminder_id' });
db.reminder_log.belongsTo(db.reminder);
db.reminder.belongsTo(db.patient);
db.patient.hasMany(db.reminder, { foreignKey: 'patient_id' });
db.reminder.belongsTo(db.prescription);
db.prescription.hasMany(db.reminder, { foreignKey: 'prescription_id' });

module.exports = db;
