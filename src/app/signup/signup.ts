import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Signup</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Signup</button>
      </form>
      <p>Already have account? <a routerLink="/login">Login</a></p>
      <p *ngIf="message" class="success">{{message}}</p>
      <p *ngIf="error" class="error">{{error}}</p>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin: 10px 0; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; }
    .success { color: green; }
    .error { color: red; }
  `]
})
export class SignupComponent {
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.signup(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Signup successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => this.error = 'Signup failed'
    });
  }
}