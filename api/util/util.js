const fs = require('fs');
const csv = require('csv-parser');
const { app_url } = require('../config/config');
const smsService = require('../services/smsService');

exports.loadCsv = async (filePath, withDateFields = false) => {
    const result = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (withDateFields) {
                    data.created_at = new Date();
                    data.updated_at = new Date();
                }
                result.push(data)
            })
            .on('end', () => {
                resolve(result);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

exports.isMobileNumber = (mobile_number) => {
    const mobileRegex = /^\+[1-9]\d{1,14}$/;
    return mobileRegex.test(mobile_number);
}

exports.sendQuestionnaireToPatient = async (mobileNumber, patientId) => {
    // Set message
    const questionnaireUrl = `${app_url}/reg/${patientId}/`;
    const message = `Hi, please complete the questionnaire form at ${questionnaireUrl} before your next appointment.`;
    const result = await smsService.sendSms(message, mobileNumber);
    return result;
}

exports.sendFollowUpToPatient = async (mobileNumber, patientId) => {
    // Set message
    const prescriptionUrl = `${app_url}/prescription/${patientId}/`;
    const video_url = "https://www.youtube.com/watch?v=Q4yUlJV31Rk&pp=ygUmaGVhbHRoIGVhdGluZyBoYWJpdCBtb3RpdmF0aW9uYWwgdmlkZW8%3D"
    const message = `Hi, please fill the form regarding your prescriptions taken in last appointment at ${prescriptionUrl}.

Look at the video at ${video_url} to know how to fill the questionnaire.`;
    const result = await smsService.sendSms(message, mobileNumber);
    return result;
}
