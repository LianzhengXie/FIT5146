'use strict';
const { loadCsv } = require('../util/util.js')

const filePath = 'data/readiness.csv'
const promise = loadCsv(filePath, true)

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
            queryInterface.bulkInsert('readiness', data, {});
        })
        // await queryInterface.bulkInsert('readiness', readiness, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('readiness', null, {});
    }
};
