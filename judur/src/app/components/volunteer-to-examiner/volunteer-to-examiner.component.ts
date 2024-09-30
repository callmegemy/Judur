import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-volunteer-to-examiner',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './volunteer-to-examiner.component.html',
  styleUrl: './volunteer-to-examiner.component.css'
})
export class VolunteerToExaminerComponent {
  onSubmit(form: any) {
    console.log('Application submitted:', form.value);
   
  }
}
