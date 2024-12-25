// src/models/userModel.js
const { pool } = require('../config/database');

const userModel = {
    // Crear tabla si no existe
    async createTable() {
        try {
            const connection = await pool.getConnection();
            await connection.query(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            connection.release();
            console.log('Tabla usuarios creada o verificada correctamente');
        } catch (error) {
            console.error('Error creando tabla:', error);
            throw error;
        }
    },

    // Crear usuario
    async create(userData) {
        try {
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
                [userData.nombre, userData.email]
            );
            return { id: result.insertId, ...userData };
        } catch (error) {
            throw error;
        }
    },

    // Obtener todos los usuarios
    async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Obtener usuario por ID
    async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Actualizar usuario
    async update(id, userData) {
        try {
            const [result] = await pool.query(
                'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
                [userData.nombre, userData.email, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // Eliminar usuario
    async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = userModel;