import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuctionService } from '../auction.service';
import { AuctionserviceService } from '../services/auctionservice.service';

@Component({
  selector: 'app-auction-payment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auction-payment-page.component.html',
  styleUrl: './auction-payment-page.component.css'
})
export class AuctionPaymentPageComponent {
  auctionWinners: any[] = [];

  constructor(private auctionService: AuctionserviceService) {}

  ngOnInit(): void {
    this.auctionService.getCompletedAuctions().subscribe(
      (data) => {
        this.auctionWinners = data;
      },
      (error) => {
        console.error('Error fetching auction winners', error);
      }
    );
  }
}
