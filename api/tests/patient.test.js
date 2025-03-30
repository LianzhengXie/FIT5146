const request = require('supertest')
const app = require('../app')
const db = require("../models");
const jwt = require('jsonwebtoken');

let patientToken; // Declare a variable to store the token

describe('Authentication', () => {

    it('Should login patient', async () => {
        const data = global.patientData
        const res = await request(app)
            .post('/api/login')
            .send(data)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body.success).toEqual(true)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('token')
        patientToken = res.body.data.token; // Assign the token value to the variable
    })

    // Use the authToken variable in other test cases
    it('Decoded patient token should contain id, visit_dt_tm and patient {id, code}', async () => {
        // const res = await request(app)
        //     .get('/api/protected-route')
        //     .set('Authorization', `Bearer ${authToken}`) // Use the token in the request header
        // Decode the token
        const decoded = jwt.decode(patientToken)
        expect(decoded).toHaveProperty('id')
        expect(decoded).toHaveProperty('visit_dt_tm')
        expect(decoded).toHaveProperty('patient')
        const patient = decoded.patient
        expect(patient).toHaveProperty('id')
        expect(patient).toHaveProperty('code')
        expect(patient.code).toEqual(global.patientData.code)
    })
})