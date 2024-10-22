import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { EchoService } from '../../services/echo.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

interface Notification {
  id: number;
  message: string;
  time: string;
  is_read: boolean;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
   notification: any; 

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.fetchNotifications(); 
    this.notificationService.notifications$.subscribe((data: Notification[]) => {
      this.notifications = data;
    });
  }
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
  
 
}
