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
  validationErrors: any = {}; 
  

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
      const base64Image = this.selectedFile ? `data:${this.selectedFile.type};base64,${reader.result?.toString().split(',')[1]}` : null;
        
        const eventData = {
            title: this.event.title,
            location: this.event.location,
            land_id: this.event.land_id,
            date: this.event.date,
            time: this.event.time,
            expected_organizer_number: this.event.expected_organizer_number,
            allocatedMoney: this.event.allocatedMoney,
            allocatedItems: this.event.allocatedItems,
            event_status: this.event.event_status,
            description: this.event.description,
            duration: this.event.duration,
            people_helped: this.event.people_helped,
            goods_distributed: this.event.goods_distributed,
            image: base64Image 
        };

        console.log(eventData); 

        this.eventsService.editEvent(this.eventId, eventData).subscribe(
            response => {
                console.log('Event updated successfully', response);
                this.router.navigate(['/dashboard/events']);
            },
            error => {
                console.error('Error occurred while updating the event', error);
                if (error.error && error.error.errors) {
                  this.validationErrors = error.error.errors; 

                  console.log(this.validationErrors);

                }
            }
        );
    };

    if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile); 
    } else {
        const eventData = {
            title: this.event.title,
            location: this.event.location,
            land_id: this.event.land_id,
            date: this.event.date,
            time: this.event.time,
            expected_organizer_number: this.event.expected_organizer_number,
            allocatedMoney: this.event.allocatedMoney,
            allocatedItems: this.event.allocatedItems,
            event_status: this.event.event_status,
            description: this.event.description,
            duration: this.event.duration,
            people_helped: this.event.people_helped,
            goods_distributed: this.event.goods_distributed,
            image: null 
        };

        this.eventsService.editEvent(this.eventId, eventData).subscribe(
            response => {
                console.log('Event updated successfully', response);
                this.router.navigate(['/dashboard/events']);
            },
            error => {
                console.error('Error occurred while updating the event', error);
                if (error.error && error.error.errors) {
                  this.validationErrors = error.error.errors; 
                  console.log(this.validationErrors);
                }
            }
        );
    }
}



  
}
