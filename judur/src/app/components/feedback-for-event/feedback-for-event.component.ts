import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FeedbackService } from '../../feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback-for-event',
  standalone: true,
  imports: [FeedbackForEventComponent,NavbarComponent,FormsModule],
  templateUrl: './feedback-for-event.component.html',
  styleUrl: './feedback-for-event.component.css'
})
export class FeedbackForEventComponent {
  feedback: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  onSubmit() {
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
