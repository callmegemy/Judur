import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { // Inject AuthService
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]], // Updated field for phone
      role_id: ['', [Validators.required]], // Added role_id field
      age: ['', [Validators.required, Validators.min(1)]], // Added age field, assuming a minimum age of 1
      password: ['', [Validators.required, Validators.minLength(6)]],
   
    });
  }


  // passwordMatchValidator(group: FormGroup): any {
  //   return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
  // }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, phone, role_id, age, password } = this.registerForm.value;
      const userData = {
        name,
        email,
        password,
        role_id, // Send role_id to the backend
        age, // Send age to the backend
        phone // Send phone to the backend
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    }
  }

}
