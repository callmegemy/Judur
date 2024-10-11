import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VolunteerService } from '../../services/volunteer.service'; 
import { NotificationService } from '../../services/notification.service'; 
import { CommonModule } from '@angular/common';
import { EchoService } from '../../services/echo.service';
export interface Notification {
  id: number;
  message: string;
  time: string;
}
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
  isAdmin: boolean = false;
  isjustvolunteer: boolean = false; 
  notificationCount: number = 0; 
  notifications: Notification[] = []; // Add notifications array
  dropdownVisible: boolean = false; // Track dropdown visibility

  constructor(
    private router: Router,
    public authService: AuthService,
    private volunteerService: VolunteerService,
    private notificationService: NotificationService ,
    private echoService: EchoService
  ) {
    this.echoService.listenForLandInspection();
  }

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
          if (user.role_id === 1) { 
            this.isAdmin = true;
          }
        
          if (user.role_id === 3) { 
            this.volunteerService.getVolunteerIdByUserId(user.id).subscribe({
              next: (volunteerData) => {
                if (volunteerData && volunteerData.examiner === 1) {
                  this.isExaminer = true; 
                } else {
                  this.isjustvolunteer = true;  
                }
              },
              error: (error) => {
                console.error('Error fetching volunteer ID:', error);
              }
            });
          }
        }

        // Fetch notifications when the user is logged in
        this.fetchNotifications();
      }
    });

    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications; 
      this.notificationCount = notifications.length; 
    });
  }

  fetchNotifications() {
    this.notificationService.fetchNotifications();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
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
