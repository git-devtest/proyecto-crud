// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

// Crear tabla al iniciar
productModel.createTable();

// Rutas para productos
// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await productModel.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await productModel.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear producto
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await productModel.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await productModel.update(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await productModel.delete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;