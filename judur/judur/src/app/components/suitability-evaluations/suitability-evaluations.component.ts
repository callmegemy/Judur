import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VolunteerService } from '../../services/volunteer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-suitability-evaluations',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './suitability-evaluations.component.html',
  styleUrls: ['./suitability-evaluations.component.css'] 
})
export class SuitabilityEvaluationsComponent implements OnInit {
  landData: any[] = [];
  volunteerId: number | undefined;
  errorMessage: string | null = null; // Error message to display if any

  constructor(
    private volunteerService: VolunteerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
  
    if (user && user.role_id === 3) {
      this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
        next: (volunteerData) => {
          this.volunteerId = volunteerData.volunteer_id;
  
          // Fetch land inspections data
          if (this.volunteerId !== undefined) {
            this.fetchLandInspections(this.volunteerId);
          }
        },
        error: (error) => {
          console.error('Error fetching volunteer ID:', error);
          this.errorMessage = 'Error fetching volunteer information.';
        }
      });
    } else {
      console.warn('User is not a volunteer or not logged in.');
      this.errorMessage = 'User is not a volunteer or not logged in.';
    }
  }
  
  fetchLandInspections(volunteerId: number): void {
    this.volunteerService.getLandInspections(volunteerId).subscribe({
      next: (data) => {
        this.landData = data;
      },
      error: (error) => {
        console.error('Error fetching land inspections:', error);
        this.errorMessage = 'Error fetching land inspections.';
      }
    });
  }
  


}
