module.exports = {
    DBConnectors: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
    },
    emailConfig: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },    
};
