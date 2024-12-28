// src/app/components/index/index.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        this.usuarioService.login(this.loginForm.value).subscribe({
          next: (response) => {
            console.log('Login exitoso', response);
            this.router.navigate(['/usuarios']);
          },
          error: (error) => {
            console.error('Error en login', error);
            alert('Credenciales inválidas');
          }
        });
      }
      
      console.log(this.loginForm.value);
    }
  }
}