import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VolunteerService } from '../../services/volunteer.service'; // Ensure this import exists
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any; 
  loggedIn: boolean = false;
  isExaminer: boolean = false; 
  isDonor: boolean = false;
  isjustvolunteer:boolean=false; 

  constructor(
    private router: Router,
    public authService: AuthService,
    private volunteerService: VolunteerService 
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
      
      if (this.loggedIn) {
        const user = this.authService.getUserData();
        this.user = user; 

        if (user) {
          if (user.role_id === 2) { 
            this.isDonor = true;
          }
        
          if (user.role_id === 3) { 
            this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
              next: (volunteerData) => {
                if (volunteerData && volunteerData.examiner === 1) {
                  this.isExaminer = true; 
                }else{
                  this.isjustvolunteer = true;  
                }
              },
              error: (error) => {
                console.error('Error fetching volunteer ID:', error);
              }
            });
          }
        }
      }
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        alert('An error occurred during logout. Please try again.');
      }
    });
  }
}
