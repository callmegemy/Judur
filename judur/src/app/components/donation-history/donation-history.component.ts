import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { Chart } from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donation-history',
  standalone: true,
  imports: [CommonModule, RouterModule , NavbarComponent],
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {
  donationHistory: any = {};
  totalItemsDonated: number = 0;
  totalMonetaryDonations: number = 0;
  totalLandDonated: number = 0;
  totalDonations: number = 0;
  lastDonationDate: string = 'N/A';
  errorMessage: string = '';

  @ViewChild('donationChartCanvas') donationChartCanvas!: ElementRef;

  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDonationHistory();
  }

  // Fetch the donation history from the service
  fetchDonationHistory(): void {
    this.donationService.getDonationHistory().subscribe(
      (data) => {
        console.log('Donation History API Response:', data); // Log API response
  
        if (data) {
          this.donationHistory = data;
          this.totalItemsDonated = data.total_item_donations || 0;
          this.totalMonetaryDonations = data.total_financial_donations?.amount || 0;
          this.totalLandDonated = data.total_land_donations || 0;
          this.totalDonations = this.totalItemsDonated + this.totalLandDonated + (this.totalMonetaryDonations > 0 ? 1 : 0);
          this.lastDonationDate = data.last_donation_date || 'N/A';
  
          // Combine all donations (items, financial, and land) into one array
          this.donationHistory.donations = [
            ...data.financial_donations.map((donation: any) => ({ ...donation, type: 'money' })),
            ...data.item_donations.map((donation: any) => ({ ...donation, type: 'item' })),
            ...data.land_donations.map((donation: any) => ({ ...donation, type: 'land' }))
          ];
  
          this.renderChart();
        } else {
          this.errorMessage = 'No donation history found';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching donation history';
        console.error('Error fetching donation history', error); // Log the error
      }
    );
  }
  

  // Render the chart using Chart.js
  renderChart(): void {
    const ctx = this.donationChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Items Donated', 'Money Donated', 'Land Donated'],
        datasets: [
          {
            data: [
              this.totalItemsDonated,
              this.totalMonetaryDonations,
              this.totalLandDonated
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  // Navigation methods for viewing details
  viewFinancialDetails(): void {
    this.router.navigate(['/donation-money-details']);
  }

  viewItemDetails(): void {
    this.router.navigate(['/donation-item-details']);
  }

  viewLandDetails(): void {
    this.router.navigate(['/donation-land-details']);
  }
  goToDetails(type: string, createdAt: string): void {
    if (type === 'item') {
      this.router.navigate(['/donation-item-details', createdAt]);
    } else if (type === 'financial') {
      this.router.navigate(['/donation-money-details', createdAt]);
    } else if (type === 'land') {
      this.router.navigate(['/donation-land-details', createdAt]);
    }
  }


  getIcon(donationType: string): string {
    switch (donationType) {
      case 'item':
        return 'fas fa-boxes';
      case 'money':
        return 'fas fa-dollar-sign';
      case 'land':
        return 'fas fa-map-marked-alt';
      default:
        return 'fas fa-gift';
    }
  }
  
}