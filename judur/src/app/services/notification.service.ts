import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; // Make sure to import your AuthService

export interface Notification {
  id: number;
  message: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token is missing, ensure the user is logged in.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  fetchNotifications() {
    const headers = this.getAuthHeaders();
    this.http.get<Notification[]>('http://localhost:8000/api/notifications', { headers })
       .subscribe(
      (notifications) => {
        this.loadNotificationsFromBackend(notifications);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  loadNotificationsFromBackend(notifications: any[]) {
    const formattedNotifications: Notification[] = notifications.map((notification) => ({
      id: notification.id,
      message: notification.message,
      time: new Date(notification.created_at).toLocaleTimeString(),
    }));
    this.notificationsSubject.next(formattedNotifications);
  }


  addNotification(notification: Notification) {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  

  clearNotifications() {
    this.notificationsSubject.next([]);
  }
}
