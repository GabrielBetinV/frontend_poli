import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  mobileMenuOpen = false;
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }


  get isAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.rol === 'ADMINISTRADOR';
      } catch (e) {
        console.error('Error al parsear el usuario desde localStorage', e);
        return false;
      }
    }
    return false;
  }


  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
