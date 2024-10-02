import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-money-details',
  templateUrl: './donation-money-details.component.html',
  styleUrls: ['./donation-money-details.component.css']
})
export class DonationMoneyDetailsComponent implements OnInit {

  financialDonations: any[] = [];

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.donationService.getFinancialDonations().subscribe((data) => {
      this.financialDonations = data;
    }, (error) => {
      console.error('Error fetching financial donations', error);
    });
  }
}
