import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation-item-details.component.html',
  styleUrls: ['./donation-item-details.component.css']
})
export class DonationItemDetailsComponent implements OnInit {

  donationDetails: any;
  donationDate: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.donationDate = this.route.snapshot.paramMap.get('id');
    this.donationDetails = this.getDonationDetails(this.donationDate);
  }

  getDonationDetails(date: string | null): any {
    const allDonations = [
      { type: 'item', details: 'Canned Food', quantity: 50, description: 'Canned beans', condition: 'Good', expiryDate: '2025-09-10', date: '2024-09-10' }
    ];
    return allDonations.find(donation => donation.date === date);
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
