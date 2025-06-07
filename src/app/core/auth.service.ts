import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get isLoggedIn(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  private readonly hardcodedUser = {
    username: 'admin',
    password: '1234',
  };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (
      username === this.hardcodedUser.username &&
      password === this.hardcodedUser.password
    ) {
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.setItem('authenticated', 'false');
    this.router.navigate(['/']);
  }
}
