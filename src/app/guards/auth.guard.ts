import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simula autenticación usando localStorage (puedes cambiarlo según tu servicio real)
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    router.navigate(['/auth/login']);
    return false;
  }

  // Si está autenticado, permite el acceso
  return true;
};
