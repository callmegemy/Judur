 import { Component } from '@angular/core';
 import { NavbarComponent } from '../navbar/navbar.component';
import { AuctionService } from '../../auction.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

 @Component({
   selector: 'app-details-auctions',
   standalone: true,
imports : [NavbarComponent, CommonModule],
   templateUrl: './details-auctions.component.html',
   styleUrl: './details-auctions.component.css'
 })
 export class DetailsAuctionsComponent {
  auctionId: any;
  auctionDetails: any;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('id'); 
    this.loadAuctionDetails();
  }

  loadAuctionDetails(): void {
    this.auctionService.getAuctionById(this.auctionId).subscribe(data => {
      this.auctionDetails = data;
      console.log(this.auctionDetails); 
    });
  }
 }
