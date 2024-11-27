module.exports = {
    DBConnectors: {
        host: process.env.DB_HOST || "0.0.0.0",
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    jwt: {
        secret: 'abxyz',
        tokenLoginExpiredDays: '1d'
    },
    server: {
        port: process.env.NODE_PORT,
    },
};
