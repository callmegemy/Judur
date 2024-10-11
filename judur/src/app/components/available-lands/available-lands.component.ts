import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service'; // Assuming you have a volunteer service
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EchoService } from '../../services/echo.service';
interface PendingLand {
  id: number;
  donor_name: string; 
  description: string;
  land_size: number;
  address: string;
}

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
    private echoService: EchoService
  ) { 
    
  }

  ngOnInit(): void {
    this.getPendingLands();
    this.echoService.listenForLandInspection();

  }

  getPendingLands(): void {
    this.volunteerService.getPendingLands().subscribe(
      (data) => {
        this.pendingLands = data; 
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
  listenForLandInspection(): void {
    this.echoService.listenForLandInspection().subscribed((data: any) => {
      alert(`New inspection scheduled on land: ${data.land.description} for date: ${data.inspectionDate}`);
    });
  }
}
