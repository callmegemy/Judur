import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        
        const userData = this.authService.getUserData();
        console.log('User data before logout:', userData); // This should not be null if login was successful
        this.router.navigate(['/login']);
        console.log('Logged out successfully');
      },
      error: (err) => {
        console.error('Error during logout:', err);
        alert('An error occurred during logout. Please try again.');
      }
    });
  }
  
}
