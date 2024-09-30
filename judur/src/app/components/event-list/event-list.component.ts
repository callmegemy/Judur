import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent,RouterModule ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events = [
    {
      image: 'assets/img/feeding.png',
      date: '01-Jan-45',
      time: '8:00 - 10:00',
      location: 'New York',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor.'
    },
    {
      image: 'assets/img/event3.png',
      date: '01-Jan-45',
      time: '8:00 - 10:00',
      location: 'New York',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor.'
    }
  ];
}
