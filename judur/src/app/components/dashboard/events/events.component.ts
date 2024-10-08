import { Component , AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  $ from 'jquery';
import 'datatables.net';
import { EventsService } from '../../../services/dashboard/events.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements AfterViewInit{

  events: any[] = [];
  private eventsTable: any;

    constructor(private eventsService: EventsService, private cdr: ChangeDetectorRef,private router: Router ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.eventsTable) {
      this.eventsTable.destroy(true);
    }
  }
  fetchEvents() {
    this.eventsService.getEvent().subscribe(
      data => {
        console.log('Events fetched:', data);
        this.events = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching Events:', error);
      }
    );
  }
  initializeDataTables() {
    setTimeout(() => {
      if (this.events.length > 0) {
        if (this.eventsTable) {
          this.eventsTable.destroy(); 
        }
        this.eventsTable = $('#dataTable').DataTable(); 
      }
    }, 0);
  }


  onDelete(eventId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the event!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventsService.deleteEvent(eventId).subscribe(
          response => {
            console.log('Event deleted successfully', response);
            Swal.fire('Deleted!', 'The event has been deleted.', 'success').then(() => {
              location.reload(); 
            });
          },
          error => {
            console.error('Error occurred while deleting event', error);
            Swal.fire('Error!', 'Failed to delete the event.', 'error');
          }
        );
      }
    });
  }
  
  
}
