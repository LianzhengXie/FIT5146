'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const salt = await bcrypt.genSalt(10);
        await queryInterface.bulkInsert('admin_user', [
            {
                id: 'b6b7c5e0-3d6d-4d5c-8b1f-7f5d0a5e8c4a',
                username: 'admin',
                password: await bcrypt.hash('admin1234', salt),
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('admin_user', null, {});
    }
};
