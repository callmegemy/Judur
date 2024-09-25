import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-volunteer-analytics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './volunteer-analytics.component.html',
  styleUrl: './volunteer-analytics.component.css'
})
export class VolunteerAnalyticsComponent implements OnInit {
  ngOnInit(): void {
    const ctx = document.getElementById('participationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // or 'line', etc.
      data: {
        labels: ['Event 1', 'Event 2', 'Event 3'],
        datasets: [{
          label: 'Participation',
          data: [10, 20, 30],
          backgroundColor: ['#16423C', '#6A9C89', '#E9EFEC']
        }]
      }
    });
  }

}
