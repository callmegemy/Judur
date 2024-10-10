import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteer-registration',
  standalone: true, 
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.css'],
  imports: [ReactiveFormsModule,CommonModule,RouterLink], 
})
export class VolunteerRegistrationComponent {
  volunteerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: [3],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      skills: ['', Validators.required],
      availability: ['', Validators.required],
      aim: ['', Validators.required],
      profilePicture: [null] 

    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  registerVolunteer() {
    if (this.volunteerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.volunteerForm.get('name')?.value);
      formData.append('email', this.volunteerForm.get('email')?.value);
      formData.append('password', this.volunteerForm.get('password')?.value);
      formData.append('role_id', '3');
      formData.append('age', this.volunteerForm.get('age')?.value);
      formData.append('phone', this.volunteerForm.get('phone')?.value);
      formData.append('skills', this.volunteerForm.get('skills')?.value);
      formData.append('availability', this.volunteerForm.get('availability')?.value);
      formData.append('aim', this.volunteerForm.get('aim')?.value);

      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile);
      }

      this.authService.registerVolunteer(formData).subscribe({
        next: (response) => {
          console.log('Volunteer registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error during volunteer registration:', err);
        }
      });
    } else {
      console.warn('Volunteer form is invalid');
    }
  }
}
