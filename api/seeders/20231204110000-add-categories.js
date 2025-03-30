'use strict';
const { loadCsv } = require('../util/util.js')

// const filePath = 'data/categories.csv'
const filePath = 'data/categories_lm25.csv'
const promise = loadCsv(filePath, true)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await promise.then((data) => {
            queryInterface.bulkInsert('category', data, {});
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('category', null, {});
    }
};
