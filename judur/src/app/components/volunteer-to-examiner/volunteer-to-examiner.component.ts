import { Component } from '@angular/core';

@Component({
  selector: 'app-volunteer-to-examiner',
  standalone: true,
  imports: [],
  templateUrl: './volunteer-to-examiner.component.html',
  styleUrl: './volunteer-to-examiner.component.css'
})
export class VolunteerToExaminerComponent {
  onSubmit(form: any) {
    console.log('Application submitted:', form.value);
   
  }
}
