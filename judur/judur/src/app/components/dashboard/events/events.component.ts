import { Component , AfterViewInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    $('#dataTable').DataTable();
  }

}
