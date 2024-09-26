import { Component , AfterViewInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    $('#dataTable').DataTable();
    $('#dataTable2').DataTable();
  }
}
