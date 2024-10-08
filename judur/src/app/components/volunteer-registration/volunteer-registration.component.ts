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
    });
  }

  registerVolunteer() {
    console.log(this.volunteerForm.value);
    if (this.volunteerForm.valid) {
        this.authService.registerVolunteer(this.volunteerForm.value).subscribe({
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
