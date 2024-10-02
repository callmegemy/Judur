import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-item-details',
  templateUrl: './donation-item-details.component.html',
  styleUrls: ['./donation-item-details.component.css']
})
export class DonationItemDetailsComponent implements OnInit {

  itemDonations: any[] = [];

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.donationService.getItemDonations().subscribe((data) => {
      this.itemDonations = data;
    }, (error) => {
      console.error('Error fetching item donations', error);
    });
  }
}



  // goBack(): void {
  //   this.router.navigate(['/donation-history']);
  // }

