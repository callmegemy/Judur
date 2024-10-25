import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpcommingeventsService } from '../../services/upcommingevents.service';
import { EventJoinComponent } from '../event-join/event-join.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Meta, Title } from '@angular/platform-browser';

interface Event {
  title: string;
  image: string; // Update to 'image_url' if your API returns 'image_url'
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
  imports: [CommonModule, RouterLink, NavbarComponent, EventJoinComponent],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event: any;
  ngrokUrl: string = 'https://bb6a-102-185-35-68.ngrok-free.app'; 

  constructor(
    private route: ActivatedRoute,
    private eventService: UpcommingeventsService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(+eventId).subscribe((data: any) => {
        this.event = data;
        this.setMetaTags(this.event);
      });
    }
  }

  setMetaTags(event: any) {
    this.renderer.setAttribute(document.querySelector('meta[property="og:title"]'), 'content', event.title);
    this.renderer.setAttribute(document.querySelector('meta[property="og:description"]'), 'content', event.description);
    this.renderer.setAttribute(document.querySelector('meta[property="og:image"]'), 'content', event.image); // Use the correct image URL
    this.renderer.setAttribute(document.querySelector('meta[property="og:url"]'), 'content', window.location.href);
  }

  shareOnFacebook() {
    const eventId = this.route.snapshot.paramMap.get('id');
    const url = `${this.ngrokUrl}/list-event/event-details/${eventId}`; 
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    
    window.open(facebookShareUrl, '_blank');
  }

}
