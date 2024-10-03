import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  $ from 'jquery';
import 'datatables.net';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../services/dashboard/request.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit, AfterViewInit, OnDestroy {

  volunteers: any[] = [];
  examiners: any[] = [];
  private volunteersTable: any;
  private  examinersTable: any;
  constructor(private requestService: RequestService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchVolunteers();
    this.fetchExaminers();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.volunteersTable) {
      this.volunteersTable.destroy(true);
    }
    if (this.examinersTable) {
      this.examinersTable.destroy(true);
    }
  }
  fetchVolunteers() {
    this.requestService.getVolunteerRequests().subscribe(
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
      if (this.volunteers.length > 0) {
        if (this.volunteersTable) {
          this.volunteersTable.destroy(); 
        }
        this.volunteersTable = $('#dataTable').DataTable(); 
      }
    }, 0);

    setTimeout(() => {
      if (this.examiners.length > 0) {
        if (this.examinersTable) {
          this.examinersTable.destroy(); 
        }
        this.examinersTable = $('#dataTable2').DataTable(); 
      }
    }, 0);
  }

  fetchExaminers() {
    this.requestService.getExaminerRequests().subscribe(
      data => {
        console.log('examiners fetched:', data);
        this.examiners = data;
        this.cdr.detectChanges(); 
        this.initializeDataTables(); 
      },
      error => {
        console.error('Error fetching examiners:', error);
      }
    );
  }
}
