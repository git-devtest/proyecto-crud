// src/config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST_DB || 'localhost',
    user: process.env.USER_DB || 'root',
    password: process.env.PASSWORD_DB || 'root',
    database: process.env.DATABASE || 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a MySQL establecida correctamente');
        connection.release();
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
    }
}

module.exports = { pool, testConnection };