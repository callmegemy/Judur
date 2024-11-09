import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private auctionService: AuctionService,
    private router: Router, // Needed to navigate to the details page after a bid is placed
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
          this.loadAuctionDetails();
          this.bidAmount = 0;

          this.router.navigate(['/auction-list']);
        },
        (error) => {
          console.error('Error placing bid:', error);
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    });
  }

  shareOnFacebook(): void {
    const ngrokUrl = `https://98b6-102-185-116-187.ngrok-free.app/auction-details/${this.auctionId}`; 
    const title = encodeURIComponent(this.auctionDetails.title);
    const description = encodeURIComponent(this.auctionDetails.description);
    const image = encodeURIComponent(this.auctionDetails.imageUrl); 
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ngrokUrl)}&quote=${title}%0A${description}&picture=${image}`;
  
    window.open(facebookShareUrl, '_blank');
  }

  shareOnX(): void {
    const ngrokUrl = `https://98b6-102-185-116-187.ngrok-free.app/auction-details/${this.auctionId}`;
    const title = encodeURIComponent(this.auctionDetails.title);
    const description = encodeURIComponent(this.auctionDetails.description);
    const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(ngrokUrl)}&text=${title}%0A${description}`;
  
    window.open(xShareUrl, '_blank');
}
  
}
