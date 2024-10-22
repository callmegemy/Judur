import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VolunteerService } from '../../services/volunteer.service'; 
import { NotificationService } from '../../services/notification.service'; 
import { CommonModule } from '@angular/common';
import { EchoService } from '../../services/echo.service';
import { BroadcasterComponent } from '../../broadcaster/broadcaster.component';
import { ViewerComponent } from '../../viewer/viewer.component';

export interface Notification {
  id: number;
  message: string;
  time: string;
  is_read: boolean; // Add is_read property to track read status
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,BroadcasterComponent,ViewerComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any; 
  loggedIn: boolean = false;
  isExaminer: boolean = false; 
  isDonor: boolean = false;
  isAdmin: boolean = false;
  isMentor: boolean = false;
  isOrganizer: boolean = false;
  isAdminAtAll: boolean = false;
  isjustvolunteer: boolean = false; 
  notificationCount: number = 0; 
  notifications: Notification[] = []; 
  dropdownVisible: boolean = false; 

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
          if (user.role_id === 5) { 
            this.isOrganizer = true;
          }
          if (user.role_id === 6) { 
            this.isMentor = true;
          }
          if (user.role_id === 1 || user.role_id === 5 || user.role_id === 6 ) { 
            this.isAdminAtAll = true;
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

        this.fetchNotifications();
      }
    });

    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications; 
      this.notificationCount = notifications.length; 
    });
    this.notificationService.fetchNotifications(); 
    this.notificationService.notifications$.subscribe((data: Notification[]) => {
      this.notifications = data;
    });
  }

  fetchNotifications() {
    this.notificationService.fetchNotifications();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Function to toggle read status of a notification
  toggleReadStatus(notificationId: number) {
    this.notificationService.toggleNotificationStatus(notificationId).subscribe(
      (response: any) => {
        const updatedNotification = response.notification;  
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
          this.notifications[index].is_read = updatedNotification.is_read;
        }
      },
      (error: any) => {
        console.error('Error toggling notification status:', error);
      }
    );
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
