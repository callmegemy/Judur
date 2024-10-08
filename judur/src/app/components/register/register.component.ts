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
  profilePictureBase64: string | null = null;  // Variable to hold base64 image data

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.donorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: [2],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      profile_picture: ['']
    });
  }

  // Method to handle file selection and convert to base64
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePictureBase64 = e.target.result.split(',')[1];  // Extract base64 part of the image
      };

      reader.readAsDataURL(file);  // Convert file to base64
    }
  }

  // Method to submit form
  registerDonor() {
    if (this.donorForm.valid) {
      const formData = {
        name: this.donorForm.value.name,
        email: this.donorForm.value.email,
        password: this.donorForm.value.password,
        age: this.donorForm.value.age,
        phone: this.donorForm.value.phone,
        role_id: this.donorForm.value.role_id,
        profile_picture: this.profilePictureBase64  // Send base64 string of the image
      };

      this.authService.registerDonor(formData).subscribe({
        next: (response) => {
          console.log('Donor registration successful:', response);
          this.router.navigate(['/login']);  // Redirect to login page after registration
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