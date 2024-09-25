import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-examiner-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examiner-reports.component.html',
  styleUrl: './examiner-reports.component.css'
})
export class ExaminerReportsComponent {
  reports = [
    { place: 'Place 1', examiner: 'Examiner Name 1', date: '2024-09-20' },
    { place: 'Place 2', examiner: 'Examiner Name 2', date: '2024-09-21' },
    { place: 'Place 3', examiner: 'Examiner Name 3', date: '2024-09-22' }
  ];
}
