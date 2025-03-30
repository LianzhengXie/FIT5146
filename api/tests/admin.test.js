const request = require('supertest')
const app = require('../app')
const db = require("../models");
const jwt = require('jsonwebtoken');

const { createVisits, createPrescriptionsFromVisits } = require('../util/testUtil')

let adminToken; // Declare a variable to store the token

describe('Authentication', () => {

    it('Should login admin', async () => {
        const data = global.adminData
        const res = await request(app)
            .post('/api/login-admin')
            .send(data)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body.success).toEqual(true)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('token')
        adminToken = res.body.data.token; // Assign the token value to the variable
    })

    // Use the authToken variable in other test cases
    it('Decoded admin token should contain an id and username', async () => {
        const decoded = jwt.decode(adminToken)
        expect(decoded).toHaveProperty('id')
        expect(decoded).toHaveProperty('username')
        expect(decoded.username).toEqual(global.adminData.username)
    })

})

describe('Prescription', () => {
    // Get array of dates from earliest_visit_dt_tm 1 day after than previous one
    const totalDays = 3
    const visits = createVisits(totalDays)

    beforeAll(async () => {
        // Create visits
        await db.visit.bulkCreate(visits)
        // Create prescriptions. One prescription for each visit
        const prescriptions = createPrescriptionsFromVisits(visits)
        await db.prescription.bulkCreate(prescriptions)
    })
    // afterEach(async () => {
    //     // Delete all prescriptions
    //     await db.prescription.destroy({
    //         where: {},
    //         truncate: false
    //     })
    // })

    it('Should get prescription history when there is a current visit', async () => {
        const visit_id = visits[totalDays - 1].id
        const res = await request(app)
            .get(`/api/prescription/history?visit_id=${visit_id}`)
            .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200)
        // Response should be an object
        expect(typeof res.body).toEqual('object')
        // Response should have "totalDays" number of keys
        expect(Object.keys(res.body).length).toEqual(totalDays - 1)
        // Values in the response should be arrays
        expect(Object.values(res.body).every(item => Array.isArray(item))).toEqual(true)
    })
})