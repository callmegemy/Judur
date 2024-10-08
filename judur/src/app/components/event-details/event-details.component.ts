import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpcommingeventsService } from '../../services/upcommingevents.service';
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
  imports: [CommonModule , RouterLink, NavbarComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: UpcommingeventsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe((data: any) => {
        this.event = data;
      });
    }
  }
}
