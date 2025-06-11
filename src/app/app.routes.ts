import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Assuming this is still needed for other future routes
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
// Commented out imports for ProjectsComponent and TasksComponent are intentionally kept from previous state if they were there.
// import { ProjectsComponent } from './pages/projects/projects.component';
// import { TasksComponent } from './pages/tasks/tasks.component';


export const routes: Routes = [
  // Default route changed to /products
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Auth routes (assuming these components are still desired)
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },

  // Product feature routes - lazy loaded
  {
    path: 'products',
    loadChildren: () => import('./features/product/product-routing.module').then(m => m.ProductRoutingModule)
  },

  // Example of a guarded route if needed later, can be removed if not immediately applicable
  // { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },

  // Catch-all route can be added later if needed
  // { path: '**', redirectTo: '/products' }
];
