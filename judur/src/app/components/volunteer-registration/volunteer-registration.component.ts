import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteer-registration',
  standalone: true,
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
      age: ['', [Validators.required, Validators.min(18)]],
      phone: ['', Validators.required],
      skills: ['', Validators.required],
      availability: ['', Validators.required],
      aim: ['', Validators.required],
      profilePicture: [null, this.imageFileValidator()] 
    });
  }

  get name() { return this.volunteerForm.get('name'); }
  get email() { return this.volunteerForm.get('email'); }
  get password() { return this.volunteerForm.get('password'); }
  get phone() { return this.volunteerForm.get('phone'); }
  get skills() { return this.volunteerForm.get('skills'); }
  get age() { return this.volunteerForm.get('age'); }
  get availability() { return this.volunteerForm.get('availability'); }
  get aim() { return this.volunteerForm.get('aim'); }
  get profilePicture() { return this.volunteerForm.get('profilePicture'); }

  // Custom validator to check if the file is an image if provided
  imageFileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file) return null; // Allow null or empty values
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      return allowedTypes.includes(file.type) ? null : { invalidFileType: 'File must be an image' };
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.volunteerForm.patchValue({ profilePicture: file }); 
    } else {
      this.volunteerForm.patchValue({ profilePicture: null }); 
    }
  }

  registerVolunteer() {
    if (this.volunteerForm.valid) {
      const formData = new FormData();
      Object.keys(this.volunteerForm.controls).forEach(key => {
        formData.append(key, this.volunteerForm.get(key)?.value);
      });

      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile);
      }

      this.authService.registerVolunteer(formData).subscribe({
        next: (response) => {
          console.log('Volunteer registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 422) {
            const errors = err.error.errors;
            if (errors.email) {
              this.volunteerForm.get('email')?.setErrors({ serverError: errors.email[0] });
            }
            if (errors.profilePicture) {
              this.volunteerForm.get('profilePicture')?.setErrors({ serverError: errors.profilePicture[0] });
            }
          } else {
            console.error('Unexpected error:', err);
          }
        }
      });
    } else {
      console.warn('Volunteer form is invalid');
    }
  }
}