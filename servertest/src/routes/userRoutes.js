// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Crear tabla al iniciar
userModel.createTable();

// Rutas para usuarios

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await userModel.validateCredentials(email, password);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await userModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await userModel.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = await userModel.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await userModel.update(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await userModel.delete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;