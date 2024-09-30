import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-edit-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './edit-auction.component.html',
  styleUrl: './edit-auction.component.css'
})
export class EditAuctionComponent {

}
