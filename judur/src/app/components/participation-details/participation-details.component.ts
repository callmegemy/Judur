import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { VolunteerService } from '../../services/volunteer.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participation-details',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './participation-details.component.html',
  styleUrl: './participation-details.component.css'
})
export class ParticipationDetailsComponent implements OnInit {
  events: any[] = []; 
  errorMessage: string | null = null;

  constructor(
    private volunteerService: VolunteerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();

    if (user && user.role_id === 3) {
      this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
        next: (volunteerData) => {
          const volunteerId = volunteerData.volunteer_id;

          this.volunteerService.getVolunteerEvents(volunteerId).subscribe({
            next: (events) => {
              this.events = events; 
            },
            error: (error) => {
              console.error('Error fetching volunteer events:', error);
              this.errorMessage = 'Failed to load events. Please try again later.'; // Set error message
            },
          });
        },
        error: (error) => {
          console.error('Error fetching volunteer ID:', error);
          this.errorMessage = 'Failed to load volunteer information. Please try again later.'; // Set error message
        },
      });
    } else {
      console.warn('User is not a volunteer.');
      this.errorMessage = 'You are not authorized to view this page.'; // Set error message
    }
  }

}
