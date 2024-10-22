import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UpcommingeventsService } from '../../services/upcommingevents.service';
import { QrCodeModule } from 'ng-qrcode';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-join',
  standalone: true,
  imports: [CommonModule, QrCodeModule,RouterLink],
  templateUrl: './event-join.component.html',
  styleUrls: ['./event-join.component.css']
})
export class EventJoinComponent implements OnInit {
  @Input() eventId!: number;
  isLoading = false;
  isPending = false;
  buttonText = 'Join Now';
  isJoined = false;
  hideButton = false;
  qrCodeUrl: string | null = null;

  constructor(
    private eventService: UpcommingeventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();

    if (user.role_id === 2 || user.role_id === 1) {
      this.hideButton = true;
    } else if (user.role_id === 3) {
      this.eventService.checkVolunteerStatus(user.id).subscribe({
        next: (response: any) => {
          const volunteerStatus = response.status;
          this.isPending = volunteerStatus === 1;
          this.buttonText = volunteerStatus === 1 ? 'Pending Approval' : 'Join Now';
          if (volunteerStatus === 2) {
            this.checkIfJoined();
          }
        },
        error: (error: any) => {
          console.error('Error fetching volunteer status:', error);
        }
      });
    } else {
      this.hideButton = true;
    }
  }

  onJoin(): void {
    this.isLoading = true;
    this.eventService.joinEvent(this.eventId).subscribe({
      next: (response: any) => {
        this.isJoined = true;
        this.buttonText = 'Cancel';
        this.qrCodeUrl = response.qr_code_url || null;
        localStorage.setItem(`event_${this.eventId}_qrCode`, this.qrCodeUrl || '');
      },
      error: (error: any) => {
        this.handleError(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  handleError(error: any) {
    throw new Error('Method not implemented.');
  }
 
  
  onCancel(): void {
    this.isLoading = true;
    this.eventService.cancelEvent(this.eventId).subscribe({
      next: (response: any) => {
        this.isJoined = false;
        this.buttonText = 'Join Now';
        this.qrCodeUrl = null;
        localStorage.removeItem(`event_${this.eventId}_qrCode`);
      },
      error: (error: any) => {
        this.handleError(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
  private checkIfJoined(): void {
    const userId = this.authService.getUserData().id;

    const storedQrCode = localStorage.getItem(`event_${this.eventId}_qrCode`);
    if (storedQrCode) {
      this.qrCodeUrl = storedQrCode;
      this.isJoined = true;
      this.buttonText = 'Cancel';
      return;
    }

    this.eventService.isVolunteerJoined(this.eventId, userId).subscribe({
      next: (response: any) => {
        this.isJoined = response.isJoined;
        const joinedVolunteersCount = response.joined_volunteers_count;
        const expectedOrganizerNumber = response.expected_organizer_number;

        if (joinedVolunteersCount >= expectedOrganizerNumber) {
          this.isPending = true;
          this.buttonText = 'Event is Full';
        } else {
          this.buttonText = this.isJoined ? 'Cancel' : 'Join Now';
        }
      },
      error: (error: any) => {
        console.error('Error checking event participation:', error.message);
        this.isJoined = false;
        this.buttonText = 'Join Now';
      }
    });
  }
}
