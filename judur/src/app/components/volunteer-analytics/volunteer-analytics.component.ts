import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { VolunteerService } from '../../services/volunteer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-volunteer-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './volunteer-analytics.component.html',
  styleUrls: ['./volunteer-analytics.component.css'], // Corrected styleUrl to styleUrls
})
export class VolunteerAnalyticsComponent implements OnInit {

  summaryData: any;
  activityChart: Chart | undefined;
  isExaminer: boolean = false;

  constructor(
    private volunteerService: VolunteerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();

    if (user && user.role_id === 3) {
      this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
        next: (volunteerData) => {
          console.log('Volunteer data:', volunteerData); 

          if (volunteerData && volunteerData.examiner === 1) {
            this.isExaminer = true;
          }
          const volunteerId = volunteerData.volunteer_id;
          console.log(this.isExaminer); 

          this.volunteerService.getVolunteerSummary(volunteerId).subscribe({
            next: (data) => {
              console.log(data);
              this.summaryData = data; 
            },
            error: (error) => {
              console.error('Error fetching volunteer summary:', error);
            }
          });

          // Fetch volunteer activity over time
          this.volunteerService.getVolunteerActivityOverTime(volunteerId).subscribe({
            next: (data) => {
              const labels = data.map((item: any) => item.date);
              const totalHours = data.map((item: any) => item.totalHours);

              // Update the chart with the fetched data
              this.createActivityChart(labels, totalHours);
            },
            error: (error) => {
              console.error('Error fetching volunteer activity:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching volunteer ID:', error);
        }
      });
    } else {
      console.warn('User is not a volunteer or not logged in.');
    }
  }

  createActivityChart(labels: string[], totalHours: number[]): void {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;

    if (this.activityChart) {
      this.activityChart.destroy(); // Destroy the existing chart if it exists
    }

    this.activityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Hours Spent Volunteering',
          data: totalHours,
          fill: false,
          borderColor: '#16423C',
          tension: 0.1,
          backgroundColor: '#6A9C89',
          pointBackgroundColor: '#16423C',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Hours Spent'
            }
          }
        }
      }
    });
  }
}
