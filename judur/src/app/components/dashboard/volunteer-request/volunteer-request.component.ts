import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-volunteer-request',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './volunteer-request.component.html',
  styleUrl: './volunteer-request.component.css'
})
export class VolunteerRequestComponent {

}
