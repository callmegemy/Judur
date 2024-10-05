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
  donorForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.donorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: [2], 
      age: ['', Validators.required],
      phone: ['', Validators.required],
    });
}


  registerDonor() {
    if (this.donorForm.valid) {
      this.authService.registerDonor(this.donorForm.value).subscribe({
        next: (response) => {
          console.log('Donor registration successful:', response);
          
        },
        error: (err) => {
          console.error('Error during donor registration:', err);
        }
      });
    } else {
      console.warn('Donor form is invalid');
    }
  }
}