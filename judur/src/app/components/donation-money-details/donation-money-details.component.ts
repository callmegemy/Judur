import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donation-money-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './donation-money-details.component.html',
  styleUrls: ['./donation-money-details.component.css']
})
export class DonationMoneyDetailsComponent implements OnInit {

  donationDetails: any;
  donationDate: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.donationDate = this.route.snapshot.paramMap.get('id');
    this.donationDetails = this.getDonationDetails(this.donationDate);
  }

  getDonationDetails(date: string | null): any {
    const allDonations = [
      { type: 'money', details: 'Monetary Donation', amount: 500, currency: 'USD', date: '2024-08-01', donorName: 'John Doe', paymentMethod: 'Credit Card' }
    ];
    return allDonations.find(donation => donation.date === date);
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
