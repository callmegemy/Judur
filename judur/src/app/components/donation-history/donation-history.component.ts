import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { Chart } from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donation-history',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent], // Add RouterModule to imports
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {
  donationHistory = {
    name: 'John Doe',
    totalDonations: 7,
    lastDonationDate: '2024-09-10',
    donations: [
      {
        type: 'item',
        details: 'Canned Food',
        quantity: 50,
        description: 'Canned beans',
        date: '2024-09-10'
      },
      {
        type: 'money',
        details: 'Monetary Donation',
        amount: 500,
        currency: 'USD',
        date: '2024-08-01'
      },
      {
        type: 'land',
        details: 'Community Hall',
        capacity: 200,
        location: 'Downtown',
        date: '2024-06-15'
      }
    ]
  };

  totalItemsDonated: number = 0;
  totalMonetaryDonations: number = 0;
  totalLandDonated: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateDonationTotals();
    this.createDonationChart();
  }

  calculateDonationTotals(): void {
    this.donationHistory.donations.forEach(donation => {
      if (donation.type === 'item') {
        this.totalItemsDonated += donation.quantity || 0;
      } else if (donation.type === 'money') {
        this.totalMonetaryDonations += donation.amount || 0;
      } else if (donation.type === 'land') {
        this.totalLandDonated += donation.capacity || 0;
      }
    });
  }

  createDonationChart() {
    const ctx = document.getElementById('donationChart') as HTMLCanvasElement;
    if (ctx) {
      const donationDates = this.donationHistory.donations.map(donation => donation.date);
      const donationCounts = donationDates.reduce((acc: any, date: any) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(donationCounts),
          datasets: [{
            label: 'Number of Donations',
            data: Object.values(donationCounts),
            backgroundColor: 'rgba(106, 156, 137, 0.5)', // Soft Green
            borderColor: '#16423C', // Dark Teal
            borderWidth: 2,
            pointBackgroundColor: '#C4DAD2', // Light Green
            pointBorderColor: '#fff', // White point border
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: '#E9EFEC' 
              }
            },
            x: {
              grid: {
                display: false 
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#16423C' // Dark Teal legend text
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }});
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'item': return 'fas fa-boxes';
      case 'money': return 'fas fa-dollar-sign';
      case 'land': return 'fas fa-map-marked-alt';
      default: return 'fas fa-gift';
    }
  }
}
