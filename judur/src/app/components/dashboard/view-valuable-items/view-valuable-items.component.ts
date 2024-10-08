import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuctionService } from '../../../services/dashboard/auctions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-valuable-items',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './view-valuable-items.component.html',
  styleUrl: './view-valuable-items.component.css'
})
export class ViewValuableItemsComponent {
  item: any; 

  constructor(
      private auctionService: AuctionService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const itemId = this.route.snapshot.paramMap.get('id');
      if (itemId) {
          this.fetchValuableItemDetails(+itemId); 
      }
  }

  private fetchValuableItemDetails(itemId: number): void {
      this.auctionService.getValuableItemDetails(itemId).subscribe(
          (itemData) => {
              this.item = itemData; 
          },
          (error) => {
              console.error('Error fetching item details:', error);
          }
      );
  }

}
