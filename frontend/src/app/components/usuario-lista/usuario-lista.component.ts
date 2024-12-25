// src/app/components/usuario-lista/usuario-lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-usuario-lista',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './usuario-lista.component.html',
    styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
    usuarios: Usuario[] = [];

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios(): void {
        this.usuarioService.getUsuarios()
            .subscribe({
                next: (data) => this.usuarios = data,
                error: (e) => console.error('Error al cargar usuarios:', e)
            });
    }

    editarUsuario(id: number): void {
        this.router.navigate(['/usuarios/editar', id]);
    }

    eliminarUsuario(id: number): void {
        if (confirm('¿Está seguro de eliminar este usuario?')) {
            this.usuarioService.eliminarUsuario(id)
                .subscribe({
                    next: () => {
                        this.cargarUsuarios();
                        alert('Usuario eliminado correctamente');
                    },
                    error: (e) => {
                        console.error('Error al eliminar:', e);
                        alert('Error al eliminar el usuario');
                    }
                });
        }
    }
}