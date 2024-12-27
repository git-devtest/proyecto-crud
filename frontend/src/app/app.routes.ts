// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UsuarioListaComponent } from './components/usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [
    { path: 'usuarios', component: UsuarioListaComponent },
    { path: 'usuarios/crear', component: UsuarioFormComponent },
    { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
    { path: '', component: IndexComponent }
];