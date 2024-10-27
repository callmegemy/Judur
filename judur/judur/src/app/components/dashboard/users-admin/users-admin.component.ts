import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { UserService } from '../../../services/dashboard/users.service';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit, AfterViewInit, OnDestroy {
  donors: any[] = [];
  volunteers: any[] = [];
  private donorsTable: any;
  private volunteersTable: any;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchDonors();
    this.fetchVolunteers();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.donorsTable) {
      this.donorsTable.destroy(true);
    }
    if (this.volunteersTable) {
      this.volunteersTable.destroy(true);
    }
  }

  fetchDonors() {
    this.userService.getDonors().subscribe(
      data => {
        console.log('Donors fetched:', data);
        this.donors = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching donors:', error);
      }
    );
  }

  fetchVolunteers() {
    this.userService.getVolunteers().subscribe(
      data => {
        console.log('Volunteers fetched:', data);
        this.volunteers = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching volunteers:', error);
      }
    );
  }

  initializeDataTables() {
    setTimeout(() => {
      if (this.donors.length > 0) {
        if (this.donorsTable) {
          this.donorsTable.destroy(); 
        }
        this.donorsTable = $('#donorsTable').DataTable(); 
      }

      if (this.volunteers.length > 0) {
        if (this.volunteersTable) {
          this.volunteersTable.destroy(); 
        }
        this.volunteersTable = $('#volunteersTable').DataTable(); 
      }
    }, 0);
  }
}
