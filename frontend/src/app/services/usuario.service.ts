// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:3000/api/usuarios';

    constructor(private http: HttpClient) { }

    login(credentials: { email: string, password: string }): Observable<any> {
        console.log('Service: enviando request a', `${this.apiUrl}/login`); // Debug
        return this.http.post(`${this.apiUrl}/login`, credentials)
          .pipe(
            tap(
              response => console.log('Service: respuesta recibida', response),
              error => console.error('Service: error recibido', error)
            )
          );
      }
    
    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getUsuario(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    crearUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, usuario);
    }

    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}