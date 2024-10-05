import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-examiner-reports',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarComponent,TopbarComponent],
  templateUrl: './examiner-reports.component.html',
  styleUrl: './examiner-reports.component.css'
})
export class ExaminerReportsComponent {
  reports = [
    { id: 1, place: 'Place 1', examiner: 'Examiner Name', date: '2024-09-20' },
    { id: 2, place: 'Place 2', examiner: 'Examiner Name 2', date: '2024-09-21' },
    { id: 3, place: 'Place 3', examiner: 'Examiner Name 3', date: '2024-09-22' }
  ];
}
