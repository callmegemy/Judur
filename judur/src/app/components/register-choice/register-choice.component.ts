import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHandHoldingHeart, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule

@Component({
  selector: 'app-register-choice',
  standalone: true,  // Mark as standalone component
  imports: [FontAwesomeModule],  // Import FontAwesomeModule directly here
  templateUrl: './register-choice.component.html',
  styleUrls: ['./register-choice.component.css']
})
export class RegisterChoiceComponent {
  faHandHoldingHeart = faHandHoldingHeart;  // Assign icons
  faHandsHelping = faHandsHelping;

  constructor(private router: Router) {}

  navigateToDonorRegistration(): void {
    this.router.navigate(['/register']);
  }

  registerAs(type: string): void {
    if (type === 'volunteer') {
      this.router.navigate(['/volunteer-registration']);
    }
  }
}
