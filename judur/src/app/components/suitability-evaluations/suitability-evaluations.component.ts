import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VolunteerService } from '../../services/volunteer.service';
import { AuthService } from '../../services/auth.service';

interface LandInspection {
  id: number;
  donor_id: number;
  description: string;
  land_size: number;
  address: string;
  proof_of_ownership: string;
  status_name: string | null; 
  date: string;
  general_condition: string;
}


@Component({
  selector: 'app-suitability-evaluations',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './suitability-evaluations.component.html',
  styleUrls: ['./suitability-evaluations.component.css']
})
export class SuitabilityEvaluationsComponent implements OnInit {
  landData: LandInspection[] = [];
  volunteerId: number | undefined;
  errorMessage: string | null = null;
  loading: boolean = false; // Add loading state

  constructor(
    private volunteerService: VolunteerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();

    if (user && user.role_id === 3) {
      this.loading = true; // Start loading
      this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
        next: (volunteerData) => {
          this.volunteerId = volunteerData.volunteer_id;

          if (this.volunteerId !== undefined) {
            this.fetchLandInspections(this.volunteerId);
          }
        },
        error: (error) => {
          console.error('Error fetching volunteer ID:', error);
          this.errorMessage = 'Error fetching volunteer information.';
          this.loading = false; // Stop loading
        }
      });
    } else {
      console.warn('User is not a volunteer or not logged in.');
      this.errorMessage = 'User is not a volunteer or not logged in.';
    }
  }

  fetchLandInspections(volunteerId: number): void {
    console.log(`Fetching land inspections for volunteer ID: ${volunteerId}`); // Debugging line
    this.volunteerService.getLandInspections(volunteerId).subscribe({
      next: (data) => {
        console.log('Fetched land inspections:', data); // Log the data structure

        this.landData = data; // Adjust if the data is wrapped in an object (e.g., { data: [...] })
        this.loading = false; // Stop loading
      },
      error: (error) => {
        console.error('Error fetching land inspections:', error);
        this.errorMessage = error.message || 'Error fetching land inspections.'; // More informative error message
        this.loading = false; // Stop loading
      }
    });
  }
}
