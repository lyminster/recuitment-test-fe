import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
