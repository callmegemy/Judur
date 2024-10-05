
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ExaminerReportsService } from '../../../services/examiner-reports.service';
import { LandService } from '../../../services/land.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


import $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-examiner-reports',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarComponent,TopbarComponent,FormsModule],
  templateUrl: './examiner-reports.component.html',
  styleUrl: './examiner-reports.component.css'
})
export class ExaminerReportsComponent {
  reports: any[] = [];
  filteredReports: any[] = []; // Add this
  searchTerm: string = ''; // Add this
  private reportsTable: any;

  constructor(
    private examinerReportsService: ExaminerReportsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.reportsTable) {
      this.reportsTable.destroy(true);
    }
  }

  fetchReports() {
    this.examinerReportsService.getReports().subscribe(
      data => {
        console.log('Reports fetched:', data);
        this.reports = data;
        this.filteredReports = data; // Initialize filteredReports
        this.cdr.detectChanges();
        this.initializeDataTables();
      },
      error => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  initializeDataTables() {
    setTimeout(() => {
      if (this.filteredReports.length > 0) {
        if (this.reportsTable) {
          this.reportsTable.destroy();
        }
        this.reportsTable = $('#dataTable').DataTable();
      }
    }, 0);
  }

  filterReports() {
    if (!this.searchTerm) {
      this.filteredReports = this.reports; // Reset to all reports if search is empty
    } else {
      this.filteredReports = this.reports.filter(report =>
        report.hygiene.toLowerCase().includes(this.searchTerm.toLowerCase()) || // Example search criteria
        report.capacity.toString().includes(this.searchTerm)
      );
    }
  }

  onDelete(reportId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the report!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examinerReportsService.deleteReport(reportId).subscribe(
          response => {
            console.log('Report deleted successfully', response);
            Swal.fire('Deleted!', 'The report has been deleted.', 'success').then(() => {
              this.fetchReports(); // Re-fetch reports after deletion
            });
          },
          error => {
            console.error('Error occurred while deleting report', error);
            if (error.status === 404) {
              Swal.fire('Error!', 'Report not found.', 'error');
            } else {
              Swal.fire('Error!', 'Failed to delete the report.', 'error');
            }
          }
        );
      }
    });
  }
}
