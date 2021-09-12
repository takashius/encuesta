
const config = {
    dbUrl: process.env.BD_URL,
    monDebug: process.env.MONGO_DEBUG || false,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    baseurl: process.env.BASE_URL || 'http://localhost:3000',
    dev: process.env.NODE_ENV !== 'production',
    JWT_KEY: process.env.JWT_KEY,
};

module.exports = config;