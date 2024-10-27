import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationService } from '../../services/donation.service';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'; // Import DatePipe for formatting dates

@Component({
  selector: 'app-donation-land-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe], // Include necessary modules and pipes
  templateUrl: './donation-land-details.component.html',
  styleUrls: ['./donation-land-details.component.css']
})
export class DonationLandDetailsComponent implements OnInit {

  landDonations: any[] = [];
  errorMessage: string = '';

  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the logged-in donor's land donations
    this.donationService.getLandDonations().subscribe((data) => {
      if (data && data.length > 0) {
        this.landDonations = data;
      } else {
        this.errorMessage = 'No land donations found for the current donor.';
      }
    }, (error) => {
      this.errorMessage = 'Error fetching land donations';
      console.error('Error fetching land donations', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
