import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ,CommonModule, NavbarComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  testimonials = [
    {
      img: '/assets/img/testimonial-1.jpg',
      text: '“Judur made it easy for us to contribute to our local community. Their platform connects us directly with those in need, ensuring our donations make the greatest impact.”',
      name: 'Sarah Johnson',
      role: 'Community Donor'
    },
    {
      img: '/assets/img/testimonial-2.jpg',
      text: '“As a provider, Judur has helped us distribute surplus goods efficiently, turning what would be waste into valuable resources for feeding programs.”',
      name: 'Michael Lee',
      role: 'Food Provider'
    },
    {
      img: '/assets/img/testimonial-3.jpg',
      text: '“Judur’s process of evaluating donation sites ensures that places are safe and suitable, allowing us to serve the community confidently and effectively.”',
      name: 'Linda Garcia',
      role: 'Site Examiner'
    }
  ];
}
