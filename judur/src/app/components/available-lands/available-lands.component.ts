import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EchoService } from '../../services/echo.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-available-lands',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './available-lands.component.html',
  styleUrls: ['./available-lands.component.css']
})
export class AvailableLandsComponent implements OnInit {
  pendingLands: any[] = [];

  constructor(
    private volunteerService: VolunteerService,
    private echoService: EchoService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPendingLands();
    this.listenForLandInspection();
  }

  getPendingLands(): void {
    this.volunteerService.getPendingLands().subscribe(
      (data) => {
        this.pendingLands = data;
        console.log('Pending Lands:', this.pendingLands);
      },
      (error) => {
        console.error('Error fetching pending lands:', error);
        this.openSnackBar('Could not fetch pending lands. Please try again later.', 'Close');
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
          this.openSnackBar('Land owner notified successfully.', 'Close');
          land.status_id = 4; 
        },
        (error) => {
          console.error('Error notifying land owner', error);
          this.openSnackBar('Failed to notify the land owner. Please check the date and try again.', 'Close');
        }
      );
    }
  }

  listenForLandInspection(): void {
    this.echoService.listenForLandInspection().subscribed((data: any) => {
      alert(`New inspection scheduled on land: ${data.land.description} for date: ${data.inspectionDate}`);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, 
    });
  }
}
