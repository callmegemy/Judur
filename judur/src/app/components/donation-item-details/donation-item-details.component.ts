import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donation-item-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './donation-item-details.component.html',
  styleUrls: ['./donation-item-details.component.css']
})
export class DonationItemDetailsComponent implements OnInit {

  donationDetails: any = {
    type: '',
    quantity: null,
    description: '',
    condition: '',
    expiryDate: null
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // No need for ID or route parameters for a new donation
  }

  // Method to handle form submission for a new donation
  submitDonation(): void {
    // Add logic here to handle the submission of a new donation
    console.log('New donation submitted:', this.donationDetails);
    
    // After submission, redirect back to donation history or another page
    this.router.navigate(['/donation-history']);
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}