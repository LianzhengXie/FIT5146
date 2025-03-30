'use strict';
const { loadCsv } = require('../util/util.js')

const filePath = 'data/questions_mandatory.csv'
const promise = loadCsv(filePath, true)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await promise.then((data) => {
            queryInterface.bulkInsert('question_mandatory', data, {});
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('question_mandatory', null, {});
    }
};
