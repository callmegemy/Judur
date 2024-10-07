import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../auction.service';
import Swal from 'sweetalert2'; // For SweetAlert
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-auctions',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './details-auctions.component.html',
  styleUrls: ['./details-auctions.component.css'],
})
export class DetailsAuctionsComponent implements OnInit {
  auctionId: any;
  auctionDetails: any;
  bidAmount: number = 0; // Bid amount

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('id'); 
    this.loadAuctionDetails();
}

// Load auction details from the service
loadAuctionDetails(): void {
    this.auctionService.getAuctionById(this.auctionId).subscribe(data => {
        this.auctionDetails = data; // Ensure auctionDetails is set correctly
        console.log(this.auctionDetails); // Check the console for the fetched details
    });
}

  // Place a bid
  placeBid(): void {
    if (this.bidAmount <= 0) {
      Swal.fire('Invalid Bid', 'Please enter a valid bid amount.', 'error');
      return;
    }

    // Check if the bid is higher than the current highest bid
    if (this.bidAmount <= this.auctionDetails.current_highest_bid) {
      Swal.fire('Invalid Bid', 'Your bid must be higher than the current highest bid.', 'error');
      return;
    }

    // Fetch the CSRF token first before placing the bid
    this.auctionService.fetchCsrfToken().subscribe(() => {
      // Call the placeBid method from the service
      this.auctionService.placeBid(this.auctionId, this.bidAmount).subscribe(
        (response) => {
          Swal.fire('Bid Placed!', 'Your bid was successfully placed.', 'success');
          this.loadAuctionDetails(); // Refresh auction details after placing a bid
          this.bidAmount = 0; // Reset bid amount
        },
        (error) => {
          console.error('Error placing bid:', error);
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    });
  }
}
