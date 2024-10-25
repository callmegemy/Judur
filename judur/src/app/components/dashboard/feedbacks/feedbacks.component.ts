import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component";
import Swal from 'sweetalert2'; 
import { FeedbackService , Feedback } from '../../../feedback.service';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent,CommonModule],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent {
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedback().subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }

  deleteFeedback(feedbackId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This feedback will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedbackService.deleteFeedback(feedbackId).subscribe(
          () => {
            Swal.fire('Deleted!', 'The feedback has been deleted.', 'success');
            this.loadFeedbacks(); // Reload the feedback list after deletion
          },
          (error) => {
            console.error('Error deleting feedback:', error);
            Swal.fire('Error!', 'There was an error deleting the feedback.', 'error');
          }
        );
      }
    });
  }

}
