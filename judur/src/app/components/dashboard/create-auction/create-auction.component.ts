import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../../services/dashboard/auctions.service';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule],
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css'] 
})
export class CreateAuctionComponent {
  auction: any = {};
  statuses: any[] = [];
  items: any[] = []; 

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auctionService.getStatuses().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching auction statuses:', error);
      }
    );

    this.auctionService.getItems().subscribe(
      (data) => {
        this.items = data; 
      },
      (error) => {
        console.error('Error fetching auction items:', error);
      }
    );
  }

  onSubmit() {
    const formData = {
      title: this.auction.title,
      status: this.auction.status,
      item_id: this.auction.item_id, 
      start_date: this.auction.start_date,
      end_date: this.auction.end_date,
      starting_price: this.auction.starting_price,
      description: this.auction.description
    };

    this.auctionService.createAuction(formData).subscribe(
      response => {
        console.log('Auction created successfully', response);
        this.router.navigate(['/dashboard/auctions']);
      },
      error => {
        console.log('Error occurred while creating auction', error);
      }
    );
  }
}
