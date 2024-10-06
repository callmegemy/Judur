import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EventsService } from '../../services/dashboard/events.service';
import { UpcommingeventsService } from '../../services/upcommingevents.service';

@Component({
  selector: 'app-event-join',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-join.component.html',
  styleUrl: './event-join.component.css'
})
export class EventJoinComponent {
  @Input() eventId!: number;
  isLoading = false;
  isPending = false;
  buttonText = 'Join Now';
  isJoined = false; // Track if the user is participating

  constructor(
    private eventService: UpcommingeventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if the user is a volunteer and pending approval
    const user = this.authService.getUserData();
    if (user.role_id === 2) { // If the user is a volunteer
      if (!user.volunteerProfile || user.volunteerProfile.volunteer_status !== 1) {
        this.isPending = true;
        this.buttonText = 'Pending Approval';
      }
    }
    
    this.checkIfJoined();// Check if the user is participating when the component loads
    
  
  }
  


  onJoin(): void {
    this.isLoading = true;
    this.eventService.joinEvent(this.eventId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.isJoined = true; // Update the joined state
      },
      error: (error: any) => {
        console.error('Error joining event:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onCancel(): void {
    this.isLoading = true;
    this.eventService.cancelEvent(this.eventId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.isJoined = false; // Update the joined state
      },
      error: (error: any) => {
        console.error('Error canceling event:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private checkIfJoined() {
    // Add logic here to check if the user is already joined
    // This can be done via an API call if necessary
    // Example (for now setting as default false):
    this.isJoined = false;
  }
}
