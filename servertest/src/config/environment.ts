// src/config/environment.ts
import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  // Configuración del servidor
  port: process.env.PORT || 3000,
  
  // Configuración de la base de datos
  database: {
    host: process.env.HOST_DB || 'localhost',
    user: process.env.USER_DB || 'root',
    password: process.env.PASSWORD_DB || 'root',
    database: process.env.DBATABASE || 'crud'
  },
  
  // Configuración JWT
  jwtSecret: process.env.JWT_SECRET || 'tu_clave_secreta',
  
  // Otras configuraciones
  apiUrl: process.env.API_URL || 'http://localhost:3000/api'
};