import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-performance-reports',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './performance-reports.component.html',
  styleUrl: './performance-reports.component.css'
})
export class PerformanceReportsComponent {

}
