import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.css'
})
export class CreateAuctionComponent {

}
