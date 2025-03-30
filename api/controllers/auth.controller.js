const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config/config.js");
const db = require("../models");

const adminUserDb = db.admin_user;
const patientDb = db.patient;
const visitDb = db.visit;
const Op = db.Sequelize.Op;
const util = require("../util/util");

exports.loginPatientWithSms = async (req, res) => {
    // Get patient_id from req parameters
    const patientId = req.query.id
    if (!patientId) {
        return res.status(400).send({ message: "Patient ID is required" });
    }
    const patient = await patientDb.findByPk(patientId);
    if (!patient) {
        return res.status(400).send({ message: "Patient not found" });
    }
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const visit = await visitDb.findOrCreate({
        where: {
            patient_id: patient.id,
            visit_dt_tm: { [Op.gte]: yesterday }
        },
        defaults: {
            patient_id: patient.id,
            visit_dt_tm: new Date(),
            registration_dt_tm: new Date()
        }
    });
};

exports.loginPatient = async (req, res) => {
    let loginCode = req.body.code
    if (!loginCode) {
        return res.status(400).send({ message: "Code is required" });
    }
    loginCode = loginCode.toString();

    // Check if code follows the format of a mobile number
    if (!util.isMobileNumber(loginCode)) {
        res.status(400).send({
            message: "Invalid mobile number format! Enter in the format +614123456789"
        });
        return;
    }

    // Check if patient exists, if not create
    const [patient, patientCreated] = await patientDb.findOrCreate({
        where: { code: loginCode },
        defaults: { code: loginCode, mobile_number: loginCode }
    });
    let visit;
    if (patientCreated) {
        // Create new visit
        visit = await visitDb.create({
            patient_id: patient.id,
        });
    } else {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        //// Create a visit if one does not exist for today
        // Create a visit if one does not exist for yesterday
        [visit] = await visitDb.findOrCreate({
            where: {
                patient_id: patient.id,
                visit_dt_tm: { [Op.gte]: yesterday }
                // visit_dt_tm: { [Op.gte]: new Date().setHours(0, 0, 0, 0) }
            },
            defaults: {
                patient_id: patient.id,
                visit_dt_tm: new Date(),
                registration_dt_tm: new Date()
            }
        });
    }
    const token = {
        id: visit.id,
        patient: {
            id: patient.id,
            code: patient.code
        },
        visit_dt_tm: visit.visit_dt_tm
    };
    // TODO: Change the expiry time to 30 minutes in production
    // const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "30m" });
    const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "4h" });
    const jsonResponse = {
        success: true,
        data: {
            token: jwtToken
        }
    }
    res.json(jsonResponse);
}

exports.loginPatientWithId = async (req, res) => {
    let patient_id = req.body.patient_id
    if (!patient_id) {
        return res.status(400).send({ message: "Id is required" });
    }

    // Check if patient exists, if not create
    const patient = await patientDb.findByPk(patient_id);
    // Create visit
    let visit;
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    // Create a visit if there is no visit since yesterday
    [visit] = await visitDb.findOrCreate({
        where: {
            patient_id: patient.id,
            visit_dt_tm: { [Op.gte]: yesterday }
        },
        defaults: {
            patient_id: patient.id,
            visit_dt_tm: new Date(),
            registration_dt_tm: new Date()
        }
    });
    const token = {
        id: visit.id,
        patient: {
            id: patient.id,
            code: patient.code
        },
        visit_dt_tm: visit.visit_dt_tm
    };
    // TODO: Change the expiry time to 30 minutes in production
    // const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "30m" });
    const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "2h" });
    const jsonResponse = {
        success: true,
        data: {
            token: jwtToken
        }
    }
    res.json(jsonResponse);
}

// exports.loginAdmin = async (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const whereClause = { username }
//     const user = await adminUserDb.findOne({
//         where: whereClause
//     });
//     if (!user) {
//         return res.status(400).send({ message: `No user ${username} exists` });
//     }
//     const password_valid = await bcrypt.compare(password, user.password);
//     if (!password_valid) {
//         return res.status(400).send({ message: "Invalid Password" });
//     }
//     const token = {
//         id: user.id,
//         username: user.username
//     };
//     const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "12h" });
//     const jsonResponse = {
//         success: true,
//         data: {
//             token: jwtToken
//         }
//     }
//     res.json(jsonResponse);
// }
exports.loginAdmin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("LOGIN ADMIN:", { username, password });

    const user = await adminUserDb.findOne({ where: { username } });
    if (!user) {
        console.log("User not found");
        return res.status(400).send({ message: `No user ${username} exists` });
    }

    console.log("User found:", user.username);
    const password_valid = await bcrypt.compare(password, user.password);
    if (!password_valid) {
        console.log("Invalid password attempt");
        return res.status(400).send({ message: "Invalid Password" });
    }

    const token = {
        id: user.id,
        username: user.username
    };
    const jwtToken = jwt.sign(token, config.jwtConfig, { expiresIn: "12h" });

    res.json({
        success: true,
        data: {
            token: jwtToken
        }
    });
}


// exports.login = async (req, res) => {
//     let loginCode = req.body.code
//     if (!loginCode) {
//         return res.status(400).send({ message: "Code is required" });
//     }
//     loginCode = loginCode.toString();
//     // Check if patient exists, if not create
//     const [patient, patientCreated] = await patientDb.findOrCreate({
//         where: { code: loginCode },
//         defaults: { code: loginCode }
//     });
//     let visit;
//     if (patientCreated) {
//         // Create new visit
//         visit = await visitDb.create({
//             patient_id: patient.id,
//         });
//     } else {
//         // Create a visit if one does not exist for today
//         [visit] = await visitDb.findOrCreate({
//             where: {
//                 patient_id: patient.id,
//                 visit_dt_tm: { [Op.gte]: new Date().setHours(0, 0, 0, 0) }
//             },
//             defaults: { patient_id: patient.id }
//         });
//     }
//     const cookieToken = {
//         patient : {
//             id: patient.id,
//             code: patient.code
//         },
//         visit: {
//             id : visit.id,
//             visit_dt_tm : visit.visit_dt_tm
//         }
//     };
//     const jwtToken = jwt.sign(cookieToken, config.jwtConfig, { expiresIn: "2h" });
//     res.cookie(config.authToken, jwtToken, { httpOnly: true });
// };

// exports.logout = (req, res) => {
//     res.clearCookie(config.authToken);
// };
