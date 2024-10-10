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

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePictureBase64 = e.target.result.split(',')[1];  
      };

      reader.readAsDataURL(file);  
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
          console.error('Error during donor registration:', err);
        }
      });
    } else {
      console.warn('Donor form is invalid');
    }
  }
}