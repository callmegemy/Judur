import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWarehouse, faBroom, faBolt, faCamera, faCalendarAlt, faLandmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-land-report',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './land-report.component.html',
  styleUrls: ['./land-report.component.css']
})
export class LandReportComponent {
  landReportForm = new FormGroup({
    land: new FormControl(''),  // Select for choosing land
    hygiene: new FormControl(''),
    date: new FormControl(''),
    capacity: new FormControl(''),
    electricity_supply: new FormControl(''),
    photos: new FormControl('')
  });

  // Font Awesome Icons
  faWarehouse = faWarehouse;
  faBroom = faBroom;
  faBolt = faBolt;
  faCamera = faCamera;
  faCalendarAlt = faCalendarAlt;
  faLandmark = faLandmark;

  onSubmit() {
    console.log(this.landReportForm.value);
  }
}
