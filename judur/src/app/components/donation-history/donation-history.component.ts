import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { Chart } from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';

interface Donation {
  date: string;
  type: 'item' | 'financial' | 'land';
  count: number;
}

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
  donationHistoryByDate: { [key: string]: { items: number, financial: number, land: number } } = {}; // Add this line to store donations by date

  @ViewChild('donationChartCanvas') donationChartCanvas!: ElementRef;

  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDonationHistory();
  }

  // Fetch the donation history from the service
  fetchDonationHistory(): void {
    this.donationService.getDonationHistory().subscribe(
      (data) => {
        console.log('Fetched donation data:', data);
  
        if (data) {
          this.donationHistory = data;
  
          // Initialize totals
          this.totalItemsDonated = data.total_item_donations || 0;
          this.totalMonetaryDonations = data.total_financial_donations?.amount || 0;
          this.totalLandDonated = data.total_land_donations || 0;
  
          // Sum the totals
          this.totalDonations = this.totalItemsDonated + this.totalLandDonated + (this.totalMonetaryDonations > 0 ? 1 : 0);
          this.lastDonationDate = data.last_donation_date || 'N/A';
  
          // Process the donations based on date
          const donationsByDate: { [date: string]: { items: number, financial: number, land: number } } = {};
  
          const allDonations: Donation[] = [
            ...data.financial_donations?.map((donation: any) => ({ ...donation, type: 'financial', count: 1 })) || [],
            ...data.item_donations?.map((donation: any) => ({ ...donation, type: 'item', count: 1 })) || [],
            ...data.land_donations?.map((donation: any) => ({ ...donation, type: 'land', count: 1 })) || []
          ];
  
          allDonations.forEach((donation: Donation) => {
            const donationDate = donation.date;
            if (!donationsByDate[donationDate]) {
              donationsByDate[donationDate] = { items: 0, financial: 0, land: 0 };
            }
  
            if (donation.type === 'item') {
              donationsByDate[donationDate].items += donation.count;
            } else if (donation.type === 'financial') {
              donationsByDate[donationDate].financial += donation.count;
            } else if (donation.type === 'land') {
              donationsByDate[donationDate].land += donation.count;
            }
          });
  
          this.donationHistoryByDate = donationsByDate;
        } else {
          this.errorMessage = 'No donation history found';
        }
      },
      (error: any) => { 
        this.errorMessage = 'Error fetching donation history';
        console.error('Error fetching donation history:', error);
      }
    );
  }

 
  viewFinancialDetails(): void {
    this.router.navigate(['/donation-money-details']);
  }

  viewItemDetails(): void {
    this.router.navigate(['/donation-item-details']);
  }

  viewLandDetails(): void {
    this.router.navigate(['/donation-land-details']);
  }

  goToDetails(type: string): void {
    switch (type) {
      case 'item':
        this.router.navigate(['/donation-item-details']);
        break;
      case 'money':
        this.router.navigate(['/donation-money-details']);
        break;
      case 'land':
        this.router.navigate(['/donation-land-details']);
        break;
      default:
        console.error('Unknown donation type:', type);
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
