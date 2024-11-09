import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AuctionService } from '../../../services/dashboard/auctions.service';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule, RouterLink],
  providers: [DatePipe], // Ensure DatePipe is provided
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent {
  auction: any = {};
  statuses: any[] = [];
  items: any[] = [];
  errorMessages: any = {}; // To store error messages
  minDate: string;

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!; // Setting today's date as minDate
  }

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

  onSubmit(auctionForm: any) {
    if (auctionForm.valid) {
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
          if (error.status === 422) { 
            this.errorMessages = error.error.errors; 
            console.log('Validation errors:', this.errorMessages);
          } else {
            console.log('Error occurred', error);
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
