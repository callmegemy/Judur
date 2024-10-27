import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-view-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './view-auction.component.html',
  styleUrl: './view-auction.component.css'
})
export class ViewAuctionComponent {

}
