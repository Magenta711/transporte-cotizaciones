import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage = '';

  // Datos quemados
  private readonly validUsername = 'admin';
  private readonly validPassword = '123456';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSV: AuthService
  ) {}

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.authSV.login(username, password)) {
      this.router.navigate(['/quotes']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
