// src/models/userModel.js
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

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
                    password VARCHAR(255) NOT NULL,
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
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                [userData.nombre, userData.email, hashedPassword]
            );
            return { id: result.insertId, ...userData };
        } catch (error) {
            throw error;
        }
    },

    // Validar credenciales
    async validateCredentials(email, password) {
        try {
            console.log('Intentando validar credenciales para:', email); // Debug
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            console.log('Usuarios encontrados:', rows.length); // Debug

            if (rows.length === 0) {
                console.log('No se encontró usuario'); // Debug
                return null;
            }
            const user = rows[0];
            console.log('Usuario encontrado:', user.email); // Debug

            const isValid = await bcrypt.compare(password, user.password);
            console.log('Contraseña válida:', isValid); // Debug
            
            if (!isValid) {
                console.log('Contraseña incorrecta'); // Debug
                return null;
            }

            return {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            };
        } catch (error) {
            console.error('Error en validateCredentials:', error); // Debug
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