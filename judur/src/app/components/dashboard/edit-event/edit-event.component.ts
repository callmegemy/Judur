import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { EventsService } from '../../../services/dashboard/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  event: any = {}; 
  eventId: any;
  lands: any[] = []; 
  selectedFile: File | null = null; 
  errorMessage: string = ''; // Property to hold error messages

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventsService.getEventDetails(this.eventId).subscribe(data => {
      this.event = data; 
    });
    this.fetchLands();
  }

  fetchLands(): void {
    this.eventsService.eventForm().subscribe(
      (response) => {
        this.lands = response; 
      },
      (error) => {
        console.error('Error fetching lands:', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  onEdit() {
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64Image = this.selectedFile ? (reader.result as string).split(',')[1] : null;

      const formData = new FormData();
      formData.append('title', this.event.title);
      formData.append('event_status', this.event.event_status);
      formData.append('location', this.event.location);
      formData.append('date', this.event.date);
      formData.append('time', this.event.time);
      formData.append('expected_organizer_number', this.event.expected_organizer_number);
      formData.append('allocatedMoney', this.event.allocatedMoney);
      formData.append('land_id', this.event.land_id);
      formData.append('description', this.event.description);
      formData.append('duration', this.event.duration);
      if (base64Image) {
        formData.append('image', base64Image);
      }

      this.eventsService.editEvent(this.eventId, formData).subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          this.router.navigate(['/events']); 
        },
        (error) => {
          console.error('Error updating event:', error);
          this.errorMessage = 'Failed to update event. Please try again.'; // Set error message on failure
        }
      );
    };
    
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.onEditWithoutImage(); // Call a method to edit without image if necessary
    }
  }

  onEditWithoutImage() {
    const formData = new FormData();
    // Add event details to formData
    // ...

    this.eventsService.editEvent(this.eventId, formData).subscribe(
      (response) => {
        console.log('Event updated successfully:', response);
        this.router.navigate(['/events']);
      },
      (error) => {
        console.error('Error updating event:', error);
        this.errorMessage = 'Failed to update event. Please try again.';
      }
    );
  }
}
