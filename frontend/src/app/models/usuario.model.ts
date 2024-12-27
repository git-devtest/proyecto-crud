// src/app/models/usuario.model.ts
export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password?: string;
    created_at?: Date;
}