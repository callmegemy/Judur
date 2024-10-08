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
    const user = this.authService.getUserData();
    
    if (user.role_id === 3) {
      if (!user.volunteerProfile || user.volunteerProfile.volunteer_status === 1) {
        this.isPending = true;
        this.buttonText = 'Pending Approval';
      } else if (user.volunteerProfile.volunteer_status === 2) {
        this.isPending = false;
        this.checkIfJoined();  // Check if already joined
      }
    }
    
    // Check if the volunteer has already joined the event from the backend
    this.checkIfJoined();
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
    const userId = this.authService.getUserData().id;
  
    // Fetch event participation status from the API
    this.eventService.isVolunteerJoined(this.eventId, userId).subscribe({
      next: (response: any) => {
        this.isJoined = response.isJoined;
  
        // Disable the join button if the event is full
        const joinedVolunteersCount = response.joined_volunteers_count;
        const expectedOrganizerNumber = response.expected_organizer_number;
  
        if (joinedVolunteersCount >= expectedOrganizerNumber) {
          this.isPending = true;
          this.buttonText = 'Event is Full';
        } else if (this.isJoined) {
          this.buttonText = 'Cancel';
          this.isPending = false;  // Allow cancellation if already joined
        } else {
          this.buttonText = 'Join Now';
          this.isPending = false;  // Enable the "Join" button
        }
      },
      error: (error: any) => {
        console.error('Error checking event participation:', error.message);
        this.isJoined = false;  // Default to not joined if there's an error
        this.buttonText = 'Join Now';
      }
    });
  }
  
 
}
