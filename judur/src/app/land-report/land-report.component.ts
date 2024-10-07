import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWarehouse, faBroom, faBolt, faCamera, faCalendarAlt, faLandmark, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LandInspectionService } from '../services/land-inspection.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-land-report',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './land-report.component.html',
  styleUrls: ['./land-report.component.css']
})
export class LandReportComponent implements OnInit {
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
  }
}
