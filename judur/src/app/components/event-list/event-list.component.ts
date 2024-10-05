import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { UpcommingeventsService } from '../../services/upcommingevents.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent,RouterModule ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events: any[] = [];

  constructor(private eventService: UpcommingeventsService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }
}
