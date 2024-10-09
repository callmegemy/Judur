import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null; 

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    // Clear previous login error message
    this.loginError = null;
  
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.loginError = 'Invalid email or password. Please try again.'; 
        },
      });
    } else {
      // Loop through the form controls to mark them as touched
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
      this.loginError = 'Please fill in the required fields correctly.'; 
    }
  }
  
}
