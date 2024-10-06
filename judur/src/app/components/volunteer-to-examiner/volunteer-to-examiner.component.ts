import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-volunteer-to-examiner',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, HttpClientModule],  // Add ReactiveFormsModule and HttpClientModule to imports
  templateUrl: './volunteer-to-examiner.component.html',
  styleUrls: ['./volunteer-to-examiner.component.css']
})
export class VolunteerToExaminerComponent implements OnInit {
  volunteerForm: FormGroup;
  hasMadeRequest: boolean = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {
    // Initialize the form
    this.volunteerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      reason: ['', Validators.required],
      availability: ['', Validators.required],
      hours: ['', [Validators.required, Validators.min(1)]],
      nonProfitAwareness: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.volunteerForm.patchValue({
        fullName: user.name,
        email: user.email
      });
      this.checkExaminerRequest();
    } else {
      console.error('No user data available');
    }
  }

  checkExaminerRequest(): void {
    this.http.get<any>('http://localhost:8000/api/volunteer/check-examiner-request', {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    }).subscribe(
      (response) => {
        if (response.hasMadeRequest) {
          this.hasMadeRequest = true;
          this.message = response.message;
        }
      },
      (error) => {
        console.error('Error checking examiner request:', error);
      }
    );
  }

  onSubmit() {
    if (this.volunteerForm.valid) {
      const formData = this.volunteerForm.value;
      
      this.http.post<any>('http://localhost:8000/api/volunteer/request-examiner', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}`, 'Accept': 'application/json' }
      }).subscribe(
        response => {
          console.log('Application submitted successfully', response);
          this.message = 'Your request has been submitted successfully, pending admin approval.';
          this.hasMadeRequest = true;
        },
        error => {
          console.error('Error submitting application', error);
          this.message = 'There was an error submitting your application. Please try again.';
        }
      );
    } else {
      console.error('Form is invalid');
      this.message = 'Please fill in all required fields.';
    }
  }
}
