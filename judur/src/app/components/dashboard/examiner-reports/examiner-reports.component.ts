import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { LandService } from '../../../services/land.service';
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
  reports = [];

  constructor(private landService: LandService) {}

  ngOnInit(): void {
    this.landService.getLands().subscribe((data) => {
      this.reports = data;
    });
  }
}
