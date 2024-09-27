import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent {

}
