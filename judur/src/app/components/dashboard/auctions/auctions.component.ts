import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import $ from 'jquery';
import 'datatables.net';
import { AuctionService } from '../../../services/dashboard/auctions.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterLink],
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements AfterViewInit {

  auctions: any[] = [];
  ValuableItems: any[] = [];
  private auctionsTable: any;
  private valuedItemsTable: any;

  constructor(private auctionsService: AuctionService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.fetchAuctions();
    this.fetchValuableItems();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.auctionsTable) {
      this.auctionsTable.destroy(true);
    }
    if (this.valuedItemsTable) {
      this.valuedItemsTable.destroy(true);
    }
  }

  fetchAuctions() {
    this.auctionsService.getAuctions().subscribe(
      data => {
        console.log('Auctions fetched:', data);
        this.auctions = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  fetchValuableItems() {
    this.auctionsService.getItems().subscribe(
      data => {
        console.log('Valuable Items fetched:', data);
        this.ValuableItems = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching ValuableItems:', error);
      }
    );
  }

  initializeDataTables() {
    setTimeout(() => {
      if (this.auctions.length > 0) {
        if (this.auctionsTable) {
          this.auctionsTable.destroy(); 
        }
        this.auctionsTable = $('#dataTable').DataTable(); 
      }
    }, 0);

    setTimeout(() => {
      if (this.ValuableItems.length > 0) {
        if (this.valuedItemsTable) {
          this.valuedItemsTable.destroy(); 
        }
        this.valuedItemsTable = $('#valuedItemsTable').DataTable(); 
      }
    }, 0);
  }

  onDelete(auctionId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the auction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auctionsService.deleteAuction(auctionId).subscribe(
          response => {
            console.log('Auction deleted successfully', response);
            Swal.fire('Deleted!', 'The auction has been deleted.', 'success').then(() => {
              location.reload(); 
            });
          },
          error => {
            console.error('Error occurred while deleting auction', error);
            Swal.fire('Error!', 'Failed to delete the auction.', 'error');
          }
        );
      }
    });
  }
}
