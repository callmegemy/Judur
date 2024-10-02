import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for the date pipe

@Component({
  selector: 'app-donation-item-details',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule],  // Import CommonModule for pipes like date
  templateUrl: './donation-item-details.component.html',
  styleUrls: ['./donation-item-details.component.css']
})
export class DonationItemDetailsComponent implements OnInit {

  itemDonations: any[] = [];

  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    this.donationService.getItemDonations().subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          this.itemDonations = data;
        } else {
          console.error('Unexpected API response format', data);
        }
      },
      (error) => {
        console.error('Error fetching item donations', error);
      }
    );
  }

  // Go back to the donation history page
  goBack(): void {
    this.router.navigate(['/donation-history']);
  }

}
