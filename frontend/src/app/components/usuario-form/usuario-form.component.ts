// src/app/components/usuario-form/usuario-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: ``,
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
    usuarioForm: FormGroup;
    editando = false;
    usuarioId: number = 0;

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.usuarioForm = this.fb.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.editando = true;
            this.usuarioId = id;
            this.usuarioService.getUsuario(id).subscribe({
                next: (usuario) => {
                    this.usuarioForm.patchValue({
                        nombre: usuario.nombre,
                        email: usuario.email
                    });
                },
                error: (e) => {
                    console.error('Error al cargar usuario:', e);
                    alert('Error al cargar los datos del usuario');
                    this.router.navigate(['/usuarios']);
                }
            });
        }
    }

    cargarUsuario(): void {
        this.usuarioService.getUsuario(this.usuarioId)
            .subscribe({
                next: (usuario) => this.usuarioForm.patchValue(usuario),
                error: (e) => console.error('Error al cargar usuario:', e)
            });
    }

    onSubmit(): void {
        if (this.usuarioForm.valid) {
            const usuario = this.usuarioForm.value;
            
            if (this.editando) {
                this.usuarioService.actualizarUsuario(this.usuarioId, usuario)
                    .subscribe({
                        next: () => {
                            alert('Usuario actualizado correctamente');
                            this.router.navigate(['/usuarios']);
                        },
                        error: (e) => {
                            console.error('Error al actualizar:', e);
                            alert('Error al actualizar el usuario');
                        }
                    });
            } else {
                this.usuarioService.crearUsuario(usuario)
                    .subscribe({
                        next: () => {
                            alert('Usuario creado correctamente');
                            this.router.navigate(['/usuarios']);
                        },
                        error: (e) => {
                            console.error('Error al crear:', e);
                            alert('Error al crear el usuario');
                        }
                    });
            }
        }
    }

    cancelar(): void {
        this.router.navigate(['/usuarios']);
    }
}