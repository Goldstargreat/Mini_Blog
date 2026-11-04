const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL 커넥션 풀 (접속 정보는 server/.env 에서 읽음)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'miniblog',
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
