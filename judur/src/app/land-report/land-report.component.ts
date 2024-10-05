// src/app/land-report/land-report.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-land-report',
  templateUrl: './land-report.component.html',
  styleUrls: ['./land-report.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Add imports here
})
export class LandReportComponent implements OnInit {
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
