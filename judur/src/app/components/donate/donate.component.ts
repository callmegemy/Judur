import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
 

}
