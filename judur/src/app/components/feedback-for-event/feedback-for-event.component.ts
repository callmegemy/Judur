import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FeedbackService } from '../../feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-for-event',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './feedback-for-event.component.html',
  styleUrls: ['./feedback-for-event.component.css']
})
export class FeedbackForEventComponent {
  feedback: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  onSubmit() {
    if (!this.feedback.trim()) {
      console.error('Feedback is required and must be a valid string.');
      return;
    }

    this.feedbackService.submitFeedback(this.feedback).subscribe(
      response => {
        console.log('Feedback submitted:', response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}