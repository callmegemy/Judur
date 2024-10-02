import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  // event = {
  //   name: 'Annual Conference',
  //   location: 'New York',
  //   date: '2024-10-01',
  //   duration: '8:00 - 10:00',
  //   status: 'Upcoming',
  //   description: 'This is a detailed description of the event.',
  //   imageUrl: 'assets/img/feeding.png',
  //   feedbacks: [
  //     { text: 'Great event!', user: 'User1', date: '2023-09-21' },
  //     { text: 'Looking forward to it.', user: 'User2', date: '2023-09-20' }
  //   ]
  // };
  event : Event | undefined; // This will hold the event details

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id'); // Retrieve event ID from route
    this.fetchEventDetails(eventId);
  }

  fetchEventDetails(eventId: string | null) {
    if (eventId) {
      this.http.get(`http://localhost:8000/api/events/${eventId}`)
        .subscribe((data: any) => {
          this.event = data;
        });
    }
  }
}
