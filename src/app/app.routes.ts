import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProjectsComponent } from './pages/auth/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
];
