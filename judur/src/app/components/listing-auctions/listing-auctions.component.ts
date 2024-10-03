import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuctionService } from '../../auction.service';

@Component({
  selector: 'app-listing-auctions',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterLinkActive, NavbarComponent],

  templateUrl: './listing-auctions.component.html',
  styleUrls: ['./listing-auctions.component.css']})
export class ListingAuctionsComponent implements OnInit {
  
  auctionItems: any[] = [];

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctionItems = data;
    });
  }
}