import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { EchoService } from '../../services/echo.service';
import { RouterLink } from '@angular/router';

interface Notification {
  id: number;
  message: string;
  time: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.fetchNotifications(); // Fetch notifications on init
    this.notificationService.notifications$.subscribe((data: Notification[]) => {
      this.notifications = data; // Update the notifications array with fetched data
    });
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
  }
}
