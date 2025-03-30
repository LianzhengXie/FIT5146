'use strict';
const { loadCsv } = require('../util/util.js')

const filePath = 'data/questions_lm25_reduced.csv'
// const filePath = 'data/questions_lm25.csv'
const promise = loadCsv(filePath, true)
console.log('filePath', filePath)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await promise.then((data) => {
            queryInterface.bulkInsert('question', data, {});
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('question', null, {});
    }
};
