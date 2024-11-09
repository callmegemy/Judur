import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuctionService } from '../../../services/dashboard/auctions.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
    selector: 'app-view-auction',
    standalone: true,
    imports: [SidebarComponent, TopbarComponent, RouterLink],
    templateUrl: './view-auction.component.html',
    styleUrls: ['./view-auction.component.css'] 
})
export class ViewAuctionComponent implements OnInit {
    auction: any;
    item: any; 

    constructor(
        private auctionService: AuctionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const auctionId = this.route.snapshot.paramMap.get('id');
        if (auctionId) {
            this.fetchAuctionDetails(+auctionId); 
        }
    }

    private fetchAuctionDetails(auctionId: number): void {
        this.auctionService.getAuctionDetails(auctionId).subscribe(
            (auctionData) => {
                this.auction = auctionData; 
                this.fetchItemDetails(this.auction.item_id);
            },
            (error) => {
                console.error('Error fetching auction details:', error);
            }
        );
    }

    private fetchItemDetails(itemId: number): void {
        this.auctionService.getAllItems().subscribe(
            (items) => {
                this.item = items.find((item: any) => item.id === itemId); 
                console.log(this.item); 
            },
            (error) => {
                console.error('Error fetching item details:', error);
            }
        );
    }
}
