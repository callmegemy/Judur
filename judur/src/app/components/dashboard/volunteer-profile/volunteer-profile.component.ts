import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-volunteer-profile',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './volunteer-profile.component.html',
  styleUrl: './volunteer-profile.component.css'
})
export class VolunteerProfileComponent {

}
