import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
@Component({
  selector: 'app-land-inspection',
  standalone: true, // Standalone component
  templateUrl: './land-inspection.component.html',
  styleUrls: ['./land-inspection.component.css'],
  imports: [ReactiveFormsModule, CommonModule , NavbarComponent], // Import necessary modules
})
export class LandInspectionComponent {
  inspectionForm: FormGroup; 
  lands: any[] = []; 
  selectedFile: File | null = null;
  user: any;
  isExaminer: boolean = false; 

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService 
  ) {
    this.inspectionForm = this.fb.group({
      land_id: ['', Validators.required],
      date: ['', Validators.required],
      hygiene: ['', Validators.required],
      capacity: ['', Validators.required],
      electricity_supply: [false, Validators.required], // Default as false (boolean)
      general_condition: ['', Validators.required],
      photo: [null] // Photo field
    });
  }

  ngOnInit(): void {
    // Fetch the logged-in user
    this.user = this.authService.getUserData();
    console.log('Logged-in user:', this.user); // For debugging

    this.checkIfExaminer(); // Check if the user is an examiner
    this. fetchPendingLands(); // Fetch available lands
  }

  fetchPendingLands(): void {
    const token = this.authService.getToken(); // Retrieve token from AuthService
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      });
  
      this.http.get<any[]>('http://localhost:8000/api/pending-lands', { headers }) // Adjust the endpoint here
        .subscribe(
          (lands: any[]) => {
            this.lands = lands; // Store fetched lands
            console.log('Fetched pending lands:', this.lands); // For debugging
          },
          (error) => {
            console.error('Error fetching pending lands:', error); // Updated error message
          }
        );
    } else {
      console.error('No token found.');
    }
  }
  
  checkIfExaminer(): void {
    if (this.user && this.user.role_id === 3 && this.user.examiner === 1) {
      this.isExaminer = true;
      console.log('User is an examiner.'); // For debugging
    } else {
      alert('You are not authorized to submit land inspections.');
    }
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm(): void {
    if (!this.isExaminer) {
        alert('Only examiners can submit land inspections.');
        return;
    }

    const formData = new FormData();
    formData.append('land_id', this.inspectionForm.get('land_id')?.value);

    const dateValue = this.inspectionForm.get('date')?.value;
    const formattedDate = new Date(dateValue).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    formData.append('date', formattedDate);

    formData.append('hygiene', this.inspectionForm.get('hygiene')?.value);
    formData.append('capacity', this.inspectionForm.get('capacity')?.value);

    // Ensure electricity_supply is a boolean
    const electricitySupplyValue = this.inspectionForm.get('electricity_supply')?.value;
    formData.append('electricity_supply', electricitySupplyValue ? '1' : '0'); // Append as '1' for true and '0' for false

    formData.append('general_condition', this.inspectionForm.get('general_condition')?.value);

    if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
    }

    const token = this.authService.getToken(); // Retrieve token again before making the request
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    });

    this.http.post('http://localhost:8000/api/land-inspection', formData, { headers }).subscribe(
        (response: any) => {
            console.log('Land inspection submitted successfully:', response);
            alert('Land inspection submitted successfully!');
        },
        (error) => {
            console.error('Error submitting land inspection:', error);
            if (error.status === 422 && error.error.errors) {
                console.error('Validation errors:', error.error.errors);  // Log validation errors from backend
            }
        }
    );
}

}
