import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-listing-auctions',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterLinkActive, NavbarComponent],

  templateUrl: './listing-auctions.component.html',
  styleUrl: './listing-auctions.component.css'
})
export class ListingAuctionsComponent {
  // Auction items data
  auctionItems = [
    {
      title: 'Vintage Watch',
      description: 'An elegant vintage wristwatch with gold accents, perfect for collectors who appreciate timepieces from the early 20th century.',
      currentPrice: 250,
      imageUrl: '/assets/img/1930 rare vintage two colour 9ct gold Rolex Prince Brancard watch - Olde Timers.jpeg'
    },
    {
      title: 'Vintage Camera',
      description: 'A vintage camera in pristine condition, perfect for photography enthusiasts and collectors of rare cameras.',
      currentPrice: 800,
      imageUrl: '/assets/img/camera-photography-vintage-photographer.jpg'
    },
    {
      title: 'Rare Landscape Painting',
      description: 'A rare oil painting by a renowned artist, capturing a serene landscape scene. This piece will be a stunning addition to any collection.',
      currentPrice: 1200,
      imageUrl: '/assets/img/California-Plein-Air-art-Sierra.webp'
    }
  ];

}
