
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Extract the token and email from the query parameters
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  // Submit the new password
  submitNewPassword() {
    const data = {
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
    };
  
    this.http.post('http://localhost:8000/api/reset-password', data).subscribe(
      (response: any) => {
        console.log('Password reset successfully:', response);
        // Confirm the redirection line is reached
        console.log('Redirecting to login...');
        
        // Redirect to Angular login after successful reset
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error resetting password:', error);
      }
    );
  }
}  