import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [ ],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  reportId: number = 0; // Initialize with default value

  constructor(private router: Router, private route: ActivatedRoute) {}

  goBack() {
    this.router.navigate(['/examiner-reports']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the report ID from the URL
    if (id) {
      this.reportId = +id; // Assign the ID if it is not null
    }
  }
}
