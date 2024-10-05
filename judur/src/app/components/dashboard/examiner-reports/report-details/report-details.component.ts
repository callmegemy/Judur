import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerReportsService } from '../../../../services/examiner-reports.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TopbarComponent } from '../../topbar/topbar.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [ SidebarComponent,TopbarComponent,CommonModule],
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
  goBack() {
    this.router.navigate(['/dashboard/examiner-reports']);
  }

}
