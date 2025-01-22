import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router dependency
  const token = localStorage.getItem('token'); // Check if the token exists

  if (token) {
    return true; // Allow access if token is present
  }

  router.navigate(['/login']); // Redirect to the root (or login page)
  return false; // Deny access
};
