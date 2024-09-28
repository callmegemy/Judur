import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donation-land-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './donation-land-details.component.html',
  styleUrls: ['./donation-land-details.component.css']
})
export class DonationLandDetailsComponent implements OnInit {

  donationDetails: any;
  donationDate: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.donationDate = this.route.snapshot.paramMap.get('id');
    this.donationDetails = this.getDonationDetails(this.donationDate);
  }

  getDonationDetails(date: string | null): any {
    const allDonations = [
      { type: 'land', details: 'Community Hall', capacity: 200, location: 'Downtown', date: '2024-06-15', ownerName: 'Jane Smith', landArea: '5000 sq ft' }
    ];
    return allDonations.find(donation => donation.date === date);
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
