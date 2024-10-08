import { Injectable } from '@angular/core';
import pusherJs, * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private pusherClient: pusherJs;

  constructor() {
    // Set up Pusher client with your Pusher key
    this.pusherClient = new pusherJs('ca87b5368a6476b16738', {
      cluster: 'mt1',  // Same cluster from Pusher
    });
  }

  // Method to subscribe to a channel and event
  subscribeToChannel(channelName: string, eventName: string, callback: Function) {
    const channel = this.pusherClient.subscribe(channelName);
    channel.bind(eventName, (data: any) => {
      callback(data);  // Pass the data back to the calling component
    });
  }
}
