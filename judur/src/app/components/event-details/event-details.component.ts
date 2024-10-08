import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpcommingeventsService } from '../../services/upcommingevents.service';
import { EventJoinComponent } from '../event-join/event-join.component';
import { NavbarComponent } from '../navbar/navbar.component';

interface Event {
  title: string;
  image: string;
  location: string;
  date: string;
  duration: string;
  status: string;
  description: string;
  feedbacks: Feedback[];
}

interface Feedback {
  text: string;
  user: string;
  date: string;
}
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule , RouterLink, NavbarComponent,EventJoinComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private router :Router,
    private eventService: UpcommingeventsService
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(+eventId).subscribe((data: any) => {
        this.event = data;
      });
    }
  }
 
}
