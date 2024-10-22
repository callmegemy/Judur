import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-broadcaster',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './broadcaster.component.html',
  styleUrls: ['./broadcaster.component.css']
})
export class BroadcasterComponent implements OnInit {
  private socket: any;
  private localStream!: MediaStream;
  private peerConnection: RTCPeerConnection | null = null; 
  isLive: boolean = false;

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    // Initialize Socket connection
    this.socket = io('http://localhost:3000');
    this.setupSocketListeners();
  }

  async startLiveStream() {
    try {
      // Get media stream (video and audio)
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localVideo.nativeElement.srcObject = this.localStream;

      // Initialize peer connection
      this.peerConnection = new RTCPeerConnection();
      this.localStream.getTracks().forEach(track => this.peerConnection!.addTrack(track, this.localStream));

      // Create and send offer
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Emit 'start-live' event and send offer to the server
      this.socket.emit('start-live', { userId: 'broadcaster-id' });
      this.socket.emit('offer', offer);

      // Handle ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('candidate', event.candidate);
        }
      };

      this.isLive = true;  // Update live status
    } catch (error) {
      console.error('Error starting live stream:', error);
    }
  }

  endLiveStream() {
    if (this.peerConnection) {
      this.peerConnection.close();  // Close peer connection
      this.peerConnection = null;   // Set peer connection to null
    }

    // Stop all media tracks
    this.localStream.getTracks().forEach(track => track.stop());
    this.socket.emit('end-live', { userId: 'broadcaster-id' });

    this.isLive = false;  // Update live status
  }

  setupSocketListeners() {
    // Handle incoming ICE candidates
    this.socket.on('candidate', (candidate: RTCIceCandidate) => {
      if (this.peerConnection) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(error => {
          console.error('Error adding ICE candidate:', error);
        });
      } else {
        console.error('Peer connection is undefined');
      }
    });

    // Handle the answer from the viewer
    this.socket.on('answer', (answer: RTCSessionDescriptionInit) => {
      if (this.peerConnection) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer)).catch(error => {
          console.error('Error setting remote description:', error);
        });
      } else {
        console.error('Peer connection is undefined');
      }
    });
  }
}
