// src/config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_db',
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