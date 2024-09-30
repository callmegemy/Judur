import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer-registration',
  standalone: true, // Mark as standalone
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.css'],
  imports: [ReactiveFormsModule,CommonModule], // Import ReactiveFormsModule directly here
})
export class VolunteerRegistrationComponent {
  volunteerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.volunteerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      skills: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      availability: ['', Validators.required],
      preferredRoles: ['', Validators.required],
      experience: [''],
      motivation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.volunteerForm.valid) {
      const formData = this.volunteerForm.value;
      console.log('Volunteer Registration Data:', formData);

      // Handle form submission logic here
    }
  }
}
