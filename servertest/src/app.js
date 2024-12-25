// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { testConnection } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:4200', // URL de tu app Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a la base de datos
testConnection();

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);

// Rutas principales
app.get('/', (req, res) => {
    res.json({
        message: 'API REST con Express Router',
        timestamp: new Date()
    });
});

// Uso de routers
app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo salió mal!',
        message: err.message
    });
});

module.exports = app;