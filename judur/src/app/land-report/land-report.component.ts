<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWarehouse, faBroom, faBolt, faCamera, faCalendarAlt, faLandmark, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LandInspectionService } from '../services/land-inspection.service';
import { Router } from '@angular/router';
=======
// src/app/land-report/land-report.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
>>>>>>> 8835ea439dc3869decd1e35ea94754b133767eec
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-land-report',
<<<<<<< HEAD
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
=======
>>>>>>> 8835ea439dc3869decd1e35ea94754b133767eec
  templateUrl: './land-report.component.html',
  styleUrls: ['./land-report.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Add imports here
})
export class LandReportComponent implements OnInit {
<<<<<<< HEAD
  inspections: any[] = [];

  constructor(private landInspectionService: LandInspectionService, private router: Router) { }

  landReportForm = new FormGroup({
    land_id: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    examiner_id: new FormControl('', Validators.required),
    hygiene: new FormControl('', Validators.required),
    capacity: new FormControl('', [Validators.required, Validators.min(0)]),
    electricity_supply: new FormControl('', Validators.required),
    general_condition: new FormControl('', Validators.required),
    photo_path: new FormControl(null)
  });

  // Font Awesome Icons
  faWarehouse = faWarehouse;
  faBroom = faBroom;
  faBolt = faBolt;
  faCamera = faCamera;
  faCalendarAlt = faCalendarAlt;
  faLandmark = faLandmark;
  faUser = faUser;
  faInfoCircle = faInfoCircle;

  ngOnInit(): void {
    this.fetchInspections();
  }

  fetchInspections() {
    this.landInspectionService.getInspections().subscribe({
      next: (response: any) => {
        this.inspections = response;
      },
      error: (error: any) => {
        console.error('Error fetching inspections:', error);
      }
    });
  }

  onSubmit() {
    console.log('Form submitted. Valid:', this.landReportForm.valid);
    console.log('Form values:', this.landReportForm.value);

    if (this.landReportForm.valid) {
      const formData = new FormData();
      Object.keys(this.landReportForm.controls).forEach(key => {
        const control = this.landReportForm.get(key);
        if (control && control.value !== null) {
          if (key === 'photo_path' && control.value instanceof File) {
            formData.append(key, control.value, control.value.name);
          } else {
            formData.append(key, control.value);
          }
        }
      });

      console.log('FormData contents:');
      Object.keys(this.landReportForm.controls).forEach(key => {
        console.log(key, formData.get(key));
      });

      this.landInspectionService.createInspection(formData).subscribe({
        next: (response: any) => {
          console.log('Land inspection successfully created:', response);
          this.fetchInspections();
          this.landReportForm.reset();
        },
        error: (error: any) => {
          console.error('Error creating land inspection:', error);
        }
      });
    } else {
      console.log('Form is invalid');
      console.log('Form errors:', this.landReportForm.errors);
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.landReportForm.patchValue({
        photo_path: file
      });
    }
=======
  reportForm: FormGroup;
  inspections: any[] = [];
  userRole: number | null = null; // Store the user's role
  private apiUrl = 'http://127.0.0.1:8000/api'; // Update with your API URL
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.reportForm = this.fb.group({
      land_id: ['', Validators.required],
      date: ['', Validators.required],
      hygiene: ['', Validators.required],
      capacity: ['', Validators.required],
      electricity_supply: [false],
      general_condition: ['', Validators.required],
      uploadPhoto: [null]
    });
>>>>>>> 8835ea439dc3869decd1e35ea94754b133767eec
  }

  ngOnInit(): void {
    this.fetchUserRole(); // Fetch user role on component initialization
    this.fetchInspections(); // Fetch existing inspections
  }

  // Check if user is logged in
  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Fetch the current user's role
  private fetchUserRole(): void {
    const userData = this.getUserData();
    if (userData) {
      this.userRole = userData.role_id; // Use 'role_id' from local storage
    }
  }

  // Get user data from local storage
  private getUserData(): any {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn('No user data found in localStorage.');
      return null;
    }

    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Fetch all land inspections
  private fetchInspections(): void {
    const token = localStorage.getItem('auth_token');
    this.http.get<any[]>(`${this.apiUrl}/land-inspections`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.inspections = response;
        console.log('Land inspections retrieved:', this.inspections);
      },
      error: (error) => {
        console.error('Error retrieving land inspections:', error);
      }
    });
  }

  // Submit the report if user is an examiner
  submitReport(): void {
    if (this.reportForm.valid && this.userRole === 3) { // Check if user role is 3 (for examiner)
      const formData = this.reportForm.value;
      console.log('Form Data:', formData); // Log the entire form data
      console.log('Land ID:', formData.land_id); // Log the land ID specifically

      this.http.post(`${this.apiUrl}/land-inspections`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          Accept: 'application/json'
        }
      }).subscribe({
        next: (response) => {
          console.log('Report submitted:', response);
          this.fetchInspections(); // Refresh the inspections list
          this.reportForm.reset(); // Reset the form after submission
        },
        error: (error) => {
          console.error('Error submitting report:', error);
        }
      });
    } else {
      console.error('You do not have permission to submit this report.');
    }
  }

}
