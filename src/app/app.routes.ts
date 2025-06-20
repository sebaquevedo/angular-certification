import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ProjectListComponent } from './pages/projects/project-list/project-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' }, // Redirige a proyectos por defecto
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'auth/login' }, // Ruta comodín para cualquier otra cosa
];
