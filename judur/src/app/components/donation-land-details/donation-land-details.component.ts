import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-land-details',
  templateUrl: './donation-land-details.component.html',
  styleUrls: ['./donation-land-details.component.css']
})
export class DonationLandDetailsComponent implements OnInit {

  landDonations: any[] = [];

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.donationService.getLandDonations().subscribe((data) => {
      this.landDonations = data;
    }, (error) => {
      console.error('Error fetching land donations', error);
    });
  }
}
