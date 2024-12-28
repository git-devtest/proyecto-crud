import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Enviando credenciales:', this.credentials); // Debug
    this.usuarioService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // Debug
        // Navegar a la página principal si el login es exitoso
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error en login:', error); // Debug
        alert('Error al iniciar sesión');
      }
    });
  }

}
