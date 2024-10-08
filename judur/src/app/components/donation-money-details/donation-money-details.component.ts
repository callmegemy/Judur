import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationService } from '../../services/donation.service';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common'; // Import pipes for currency and date formatting

@Component({
  selector: 'app-donation-money-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe], // Include necessary modules and pipes
  templateUrl: './donation-money-details.component.html',
  styleUrls: ['./donation-money-details.component.css']
})
export class DonationMoneyDetailsComponent implements OnInit {

  financialDonations: any[] = [];
  errorMessage: string = '';

  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    this.donationService.getFinancialDonations().subscribe((data) => {
      if (data && data.length > 0) {
        this.financialDonations = data;
      } else {
        this.errorMessage = 'No financial donations found for the current donor.';
      }
    }, (error) => {
      this.errorMessage = 'Error fetching financial donations';
      console.error('Error fetching financial donations', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
