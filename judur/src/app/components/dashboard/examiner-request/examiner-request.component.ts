import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-examiner-request',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './examiner-request.component.html',
  styleUrl: './examiner-request.component.css'
})
export class ExaminerRequestComponent {

}
