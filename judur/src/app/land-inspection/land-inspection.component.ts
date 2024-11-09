import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-land-inspection',
  standalone: true,
  templateUrl: './land-inspection.component.html',
  styleUrls: ['./land-inspection.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
})
export class LandInspectionComponent {
  inspectionForm: FormGroup;
  lands: any[] = [];
  selectedFile: File | null = null;
  user: any;
  minDate: string | undefined;
  isExaminer: boolean = false;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.inspectionForm = this.fb.group({
      land_id: ['', Validators.required],
      date: ['', [Validators.required, this.pastOrTodayValidator()]],
      hygiene: ['', Validators.required],
      capacity: ['', Validators.required],
      electricity_supply: [false, Validators.required],
      general_condition: ['', Validators.required],
      photo: [null]
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  private pastOrTodayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today ? null : { futureDate: { value: control.value } };
    };
  }

  private imageTypeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return allowedTypes.includes(file.type) ? null : { invalidFileType: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    console.log('Logged-in user:', this.user);

    this.checkIfExaminer();
    this.fetchPendingLands();
  }

  fetchPendingLands(): void {
    const token = this.authService.getToken();
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      });
  
      this.http.get<any[]>('http://localhost:8000/api/pending-lands', { headers })
        .subscribe(
          (lands: any[]) => {
            this.lands = lands;
            console.log('Fetched pending lands:', this.lands);
          },
          (error) => {
            console.error('Error fetching pending lands:', error);
          }
        );
    } else {
      console.error('No token found.');
    }
  }
  
  checkIfExaminer(): void {
    if (this.user && this.user.role_id === 3 && this.user.examiner === 1) {
      this.isExaminer = true;
      console.log('User is an examiner.');
    } else {
      alert('You are not authorized to submit land inspections.');
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
        this.inspectionForm.get('photo')?.setValue(file);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a valid image (JPEG, PNG, JPG).'
        });
        this.inspectionForm.get('photo')?.setValue(null);
        this.selectedFile = null;
      }
    }
  }

  submitForm(): void {
    if (!this.isExaminer) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Only examiners can submit land inspections.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('land_id', this.inspectionForm.get('land_id')?.value);
    const dateValue = this.inspectionForm.get('date')?.value;
    const formattedDate = new Date(dateValue).toISOString().split('T')[0];
    formData.append('date', formattedDate);
    formData.append('hygiene', this.inspectionForm.get('hygiene')?.value);
    formData.append('capacity', this.inspectionForm.get('capacity')?.value);

    const electricitySupplyValue = this.inspectionForm.get('electricity_supply')?.value;
    formData.append('electricity_supply', electricitySupplyValue ? '1' : '0');
    formData.append('general_condition', this.inspectionForm.get('general_condition')?.value);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });

    this.http.post('http://localhost:8000/api/land-inspection', formData, { headers }).subscribe(
      (response: any) => {
        console.log('Land inspection submitted successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Land inspection submitted successfully!'
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('Error submitting land inspection:', error);
        if (error.status === 422 && error.error.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please correct the errors in the form.'
          });
        }
      }
    );
  }
}
