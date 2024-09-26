import { AfterViewInit, Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    $('#dataTable').DataTable();
    $('#dataTable2').DataTable();
  }
}
