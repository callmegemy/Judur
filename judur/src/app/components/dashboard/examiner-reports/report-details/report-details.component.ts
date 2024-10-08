import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExaminerReportsService } from '../../../../services/examiner-reports.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';

import { TopbarComponent } from '../../topbar/topbar.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [ SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  // reportId: number = 0; // Initialize with default value
  reportId: string = '';
  reportDetails: any;

  constructor(private route: ActivatedRoute, private router: Router, private examinerReportsService: ExaminerReportsService) {}
  report: any;

 

  ngOnInit(): void {
    // Get the report ID from the route parameters
    const reportId = this.route.snapshot.paramMap.get('id');

    // Fetch report details by ID
    this.examinerReportsService.getReportById(reportId!).subscribe((data) => {
      
      this.report = data;
    });
  }
 // Accept land
 onAcceptLand(landId: number): void {
  this.examinerReportsService.acceptLand(landId).subscribe({
    next: (response) => {
      alert('Land accepted successfully');
      // Handle further UI updates here
    },
    error: (err) => {
      console.error('Error accepting land', err);
    }
  });
}

// Reject land
onRejectLand(landId: number): void {
  this.examinerReportsService.rejectLand(landId).subscribe({
    next: (response) => {
      alert('Land rejected successfully');
      // Handle further UI updates here
    },
    error: (err) => {
      console.error('Error rejecting land', err);
    }
  });
}    // Call service to update land status
// Confirm Accept Land
confirmAcceptLand(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to accept this land inspection report.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, accept it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.updateLandStatus('accepted');
    }
  });
}

// Confirm Reject Land
confirmRejectLand(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to reject this land inspection report.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, reject it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.updateLandStatus('rejected');
    }
  });
}

updateLandStatus(status: string): void {
  if (this.report && this.report.land && this.report.land.id) {  // Ensure land ID is passed
    this.examinerReportsService.updateLandStatus(this.report.land.id, status).subscribe(
      response => {
        // Optionally update the UI
        this.report.land.status_id = status;
        Swal.fire('Updated!', `The land status has been ${status}.`, 'success')
        .then(() => {
          this.router.navigate(['/dashboard/examiner-reports']);
        });
      },
      error => {
        Swal.fire('Error!', 'Failed to update the land status.', 'error');
      }
    );
  }
}

  goBack() {
    this.router.navigate(['/dashboard/examiner-reports']);
  }

}
