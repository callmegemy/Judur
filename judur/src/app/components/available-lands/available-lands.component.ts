import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service'; // Assuming you have a volunteer service
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-available-lands',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './available-lands.component.html',
  styleUrl: './available-lands.component.css'
})
export class AvailableLandsComponent implements OnInit {

  pendingLands: any[] = [];

  constructor(private volunteerService: VolunteerService,
  ) { }

  ngOnInit(): void {
    this.getPendingLands();
  }

  getPendingLands(): void {
    this.volunteerService.getPendingLands().subscribe(
      (data) => {
        this.pendingLands = data; // Store the returned lands
        console.log('Pending Lands:', this.pendingLands);
      },
      (error) => {
        console.error('Error fetching pending lands:', error);
      }
    );
  }


  scheduleInspection(land: any): void {
    const inspectionDate = prompt('Enter inspection date (YYYY-MM-DD):');
    if (inspectionDate) {
      const request = {
        landId: land.id,
        inspectionDate: inspectionDate
      };
      this.volunteerService.notifyLandOwner(request).subscribe(
        () => {
          alert('Land owner notified successfully.');
        },
        (error) => {
          console.error('Error notifying land owner', error);
        }
      );
    }
  }
}
