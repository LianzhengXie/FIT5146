// require('dotenv').config(
//     { path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' }
// );
const { origin } = require("./config/config.js")

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    credentials: true,
    // origin: '*'
    origin: [origin, 'http://localhost:5173']
};

app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Hello World!!!" });
});

app.use('/api', require('./routes/auth.routes'));
app.use('/api/patient', require('./routes/patient.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/answer', require('./routes/visit_question.routes'));
app.use('/api/readiness', require('./routes/readiness.routes'));
app.use('/api/prescription', require('./routes/prescription.routes'));
app.use('/api/question_mandatory', require('./routes/question_mandatory.routes'));
app.use('/api/reminder', require('./routes/reminder.routes'));

app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/whatsapp', require('./routes/whatsapp.routes'));
module.exports = app;
