import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-doner-profile',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './doner-profile.component.html',
  styleUrl: './doner-profile.component.css'
})
export class DonerProfileComponent {

}
