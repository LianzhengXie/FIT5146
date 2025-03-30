require('dotenv').config(
    { path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" }
);

// DATABASE CONFIG
const db_conf = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "define": {
        "freezeTableName": true, // Stop the auto-pluralization of table names
        "underscored": true, // Set table names to snake_case
        "underscoredAll": true, // Set column names to snake_case
        "createdAt": "created_at", // Change the name of the createdAt column
        "updatedAt": "updated_at", // Change the name of the updatedAt column
        "hooks": {
            "beforeFind": (model) => {
                if (model.attributes === undefined) {
                    model.attributes = {}
                    model.attributes.exclude = ['created_at', 'updated_at']
                }
            }
        },
    },
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000,
    }
}
db_conf_test = Object.assign({}, db_conf);
db_conf_test.logging = false

module.exports = {
    development: db_conf,
    production: db_conf,
    test: db_conf_test,
    // Constants
    jwtConfig: process.env.JWT_SECRET,
    authToken: 'authToken',
    redirectUrl: '/',
    origin: process.env.CORS_ORIGIN,
    app_url: process.env.APP_URL,
}
