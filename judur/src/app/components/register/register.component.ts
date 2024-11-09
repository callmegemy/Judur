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
  profilePictureBase64: string | null = null; 
  imageTypeError: string = ''; 


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.donorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: [2],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      profile_picture: ['']  
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (!allowedTypes.includes(file.type)) {
        this.imageTypeError = 'Only JPEG, PNG, and JPG images are allowed.';
        this.profilePictureBase64 = null;
      } else {
        this.imageTypeError = '';
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profilePictureBase64 = e.target.result;  
        };
        reader.readAsDataURL(file);
      }
    }
  }

  registerDonor() {
    if (this.donorForm.valid) {
      const formData = {
        name: this.donorForm.value.name,
        email: this.donorForm.value.email,
        password: this.donorForm.value.password,
        age: this.donorForm.value.age,
        phone: this.donorForm.value.phone,
        role_id: this.donorForm.value.role_id,
        profile_picture: this.profilePictureBase64 
      };
  
      this.authService.registerDonor(formData).subscribe({
        next: (response) => {
          console.log('Donor registration successful:', response);
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          if (err.status === 422) {  // Laravel validation error status
            const validationErrors = err.error.errors;
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                this.donorForm.controls[field].setErrors({
                  serverError: validationErrors[field].join(' ')
                });
              }
            }
          } else {
            console.error('Error during donor registration:', err);
          }
        }
      });
    } else {
      console.warn('Donor form is invalid');
    }
  }
  
}