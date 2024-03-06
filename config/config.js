const dotenv = require('dotenv');
dotenv.config();

console.log("config.js 파일이 로드되었습니다."); 

module.exports = {
    development: {
        dialect: 'mysql',
        database: "nodejs",
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        host: '127.0.0.1',
    },
    production: {
        dialect: 'mysql',
        database: "nodejs",
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        host: '127.0.0.1',
    },
};