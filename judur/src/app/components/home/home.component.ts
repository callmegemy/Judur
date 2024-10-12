import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FeedbackService } from '../../feedback.service';
import { BlogPost, BlogService } from '../../services/blog.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  testimonials: any[] = [];
  recentPosts: BlogPost[] = [];


  constructor(private feedbackService: FeedbackService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.loadFeedback();
    this.loadRecentPosts();

  }

  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe(
      (data) => {
        this.testimonials = data;
        console.log('Feedback:', this.testimonials);
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  loadRecentPosts(): void {
    this.blogService.getPosts().subscribe((posts: BlogPost[]) => {
      this.recentPosts = posts.slice(0, 3); 
    });
  }

}
