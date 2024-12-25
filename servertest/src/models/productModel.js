// src/models/productModel.js
const { pool } = require('../config/database');

const productModel = {
    // Crear tabla si no existe
    async createTable() {
        try {
            const connection = await pool.getConnection();
            await connection.query(`
                CREATE TABLE IF NOT EXISTS productos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    precio DECIMAL(10, 2) NOT NULL,
                    descripcion TEXT NOT NULL,
                    stock INT NOT NULL,
                    categoria VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            connection.release();
            console.log('Tabla productos creada o verificada correctamente');
        } catch (error) {
            console.error('Error creando tabla:', error);
            throw error;
        }
    },

    // Crear producto
    async create(productData) {
        try {
            const [result] = await pool.query(
                'INSERT INTO productos (nombre, precio, descripcion, stock, categoria) VALUES (?, ?, ?, ?, ?)',
                [productData.nombre, productData.precio, productData.descripcion, productData.stock, productData.categoria]
            );
            return { id: result.insertId, ...productData };
        } catch (error) {
            throw error;
        }
    },

    // Obtener todos los productos
    async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM productos');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Obtener producto por ID
    async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Actualizar producto
    async update(id, productData) {
        try {
            const [result] = await pool.query(
                'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, stock = ?, categoria = ? WHERE id = ?',
                [productData.nombre, productData.precio, productData.descripcion, productData.stock, productData.categoria, id]
            );
            return { id, ...productData };
        } catch (error) {
            throw error;
        }
    },

    // Eliminar producto
    async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = productModel;