import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuctionService } from '../../auction.service';

@Component({
  selector: 'app-listing-auctions',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './listing-auctions.component.html',
  styleUrls: ['./listing-auctions.component.css']
})
export class ListingAuctionsComponent implements OnInit {

  auctionItems: any[] = []; // Array to hold auction items

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.loadOngoingAuctions(); // Load ongoing auctions when the component initializes
  }
  loadOngoingAuctions(): void {
    this.auctionService.getOngoingAuctions().subscribe(data => {
        console.log(data); // Check if imageUrl is included
        this.auctionItems = data;
    }, error => {
        console.error('Error fetching ongoing auctions:', error);
    });
}

  placeBid(auctionId: number, bidAmount: number): void {
    this.auctionService.placeBid(auctionId, bidAmount).subscribe(response => {
      console.log('Bid placed successfully:', response);
      // Optionally refresh the auctions or provide user feedback
    }, error => {
      console.error('Error placing bid:', error);
    });
  }
}
