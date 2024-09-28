import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule , RouterLink, NavbarComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event = {
    name: 'Annual Conference',
    location: 'New York',
    date: '2024-10-01',
    duration: '8:00 - 10:00',
    status: 'Upcoming',
    description: 'This is a detailed description of the event.',
    imageUrl: 'assets/img/feeding.png',
    feedbacks: [
      { text: 'Great event!', user: 'User1', date: '2023-09-21' },
      { text: 'Looking forward to it.', user: 'User2', date: '2023-09-20' }
    ]
  };
}
