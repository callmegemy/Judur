import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { EventsService } from '../../../services/dashboard/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  event: any = {}; 
  selectedFile: File | null = null;
  land: any[] = [];
  errorMessages: any = {}; // To store error messages

  constructor(private eventsService: EventsService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventsService.eventForm().subscribe(
      (data) => {
        this.land = data; 
      },
      (error) => {
        console.error('Error fetching lands:', error); 
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.event.title);
    formData.append('location', this.event.location);
    formData.append('land_id', this.event.land_id);
    formData.append('date', this.event.date);
    formData.append('time', this.event.time);
    formData.append('expected_organizer_number', this.event.expected_organizer_number);
    formData.append('allocatedMoney', this.event.allocatedMoney);
    formData.append('allocatedItems', this.event.allocatedItems);
    formData.append('event_status', this.event.event_status);
    formData.append('description', this.event.description);
    formData.append('duration', this.event.duration);
    formData.append('people_helped', this.event.people_helped);
    formData.append('goods_distributed', this.event.goods_distributed);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('http://localhost:8000/api/dashboard/events/create', formData).subscribe(
      response => {
        console.log('Event created successfully', response);
        this.router.navigate(['/dashboard/events']);
      },
      error => {
        if (error.status === 422) { 
          this.errorMessages = error.error.errors; 
        } else {
          console.log('Error occurred', error);
        }
      }
    );
  }  
}
