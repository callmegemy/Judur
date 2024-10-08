import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
interface NotificationData {
  message: string;
  // Add any other properties you expect in the event payload
}
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications: string[] = []; 

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Subscribe to the 'events' channel and listen for the 'EventCreated' event
    this.notificationService.subscribeToChannel('events', 'App\\Events\\EventCreated', (data : NotificationData) => {
      console.log('Notification received: ', data);
      this.notifications.push(data.message);  // Update your component state with the notification
    });
  }
}
