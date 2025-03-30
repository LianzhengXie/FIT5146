const db = require("../models");

module.exports = async () => {
    console.log('Closing db')
    await db.sequelize.close()
}