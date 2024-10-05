import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ExaminerReportsService } from '../../../services/examiner-reports.service';
import { LandService } from '../../../services/land.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
export interface Inspection {
  examiner_id: string; // Adjust the type as necessary
  date: string; // Adjust the type if needed (Date, string, etc.)
}

export interface Report {
  id: number; // Assuming ID is a number
  description: string; // Add other fields as needed
  inspections: Inspection[];
  land?: Land; }
  export interface Land {
    id: number;
    description: string;
 
}
@Component({
  selector: 'app-examiner-reports',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarComponent,TopbarComponent],
  templateUrl: './examiner-reports.component.html',
  styleUrl: './examiner-reports.component.css'
})
export class ExaminerReportsComponent {
  reports: any[] = [];

  constructor(private examinerReportsService: ExaminerReportsService) {}

  ngOnInit(): void {
    this.examinerReportsService.getReports().subscribe((data) => {
      this.reports = data;
    });
  }
}
