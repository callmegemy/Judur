import Echo from 'laravel-echo';
import * as Pusher from 'pusher-js';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root'
})
export class EchoService {
  private echo: Echo;

  constructor(private notificationService: NotificationService) {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'c7d16507d9425e0ad628',
      cluster: 'eu',
      forceTLS: true,
      pusher: Pusher
    });
  }

  listenForLandInspection() {
    console.log('Listening for land inspection events...');
    return this.echo.channel('land-inspection-channel')
        .listen('LandInspectionScheduled', (data: any) => {
            console.log('Received land inspection scheduled event:', data);
            this.notificationService.addNotification({
              id: Date.now(),
              message: `Land inspection scheduled for ${data.inspectionDate} by ${data.ownerName}`,
              time: new Date().toLocaleTimeString()
            });
            
        });
}


}
