import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-participation-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './participation-details.component.html',
  styleUrl: './participation-details.component.css'
})
export class ParticipationDetailsComponent {

}
