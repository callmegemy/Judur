import { Component } from '@angular/core';
import { AuctionService } from '../../../services/dashboard/auctions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule],
  templateUrl: './edit-auction.component.html',
  styleUrl: './edit-auction.component.css'
})
export class EditAuctionComponent {
  auction: any = {};
    statuses: any[] = [];
  items: any[] = [];
  auctionId: number | null = null;
  errorMessages:any = {};


  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.params['id'];

    // Fetch statuses
    this.auctionService.getStatuses().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching auction statuses:', error);
      }
    );

    // Fetch items
    this.auctionService.getItems().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Error fetching auction items:', error);
      }
    );

    // If editing, fetch the auction details
    if (this.auctionId) {
      this.auctionService.getAuctionDetails(this.auctionId).subscribe(
        (data) => {
          this.auction = data; 
          this.auction.status = data.status; 
        },
        (error) => {
          console.error('Error fetching auction details:', error);
        }
      );
    }
  }

  onSubmit() {
    const formData = {
      title: this.auction.title,
      status: this.auction.auction_status_id,
      item_id: this.auction.item_id,
      start_date: this.auction.start_date,
      end_date: this.auction.end_date,
      starting_price: this.auction.starting_price,
      description: this.auction.description
    };

    if (this.auctionId) {
      this.auctionService.editAuction(this.auctionId, formData).subscribe(
        response => {
          console.log('Auction updated successfully', response);
          this.router.navigate(['/dashboard/auctions']);
        },
        error => {
          console.log('Error occurred while updating auction', error);
          if (error.status === 422) { 
            this.errorMessages = error.error.errors; 
            console.log('Validation errors:', this.errorMessages);
          } else {
            console.log('Error occurred', error);
          }
        }
      );
    } else {
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
}
