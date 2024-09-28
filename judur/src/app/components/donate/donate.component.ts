import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive  } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NavbarComponent ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
 

}
