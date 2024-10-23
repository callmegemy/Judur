import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']

})
export class ViewerComponent implements OnInit {
  private socket: any;
  private peerConnection: RTCPeerConnection | null = null; 
  private remoteStream: MediaStream | null = null;
  isViewing: boolean = false;

  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    // Initialize Socket connection
    this.socket = io('http://localhost:3000');
    this.setupSocketListeners();
  }

  startViewing() {
    this.isViewing = true;

    // Initialize peer connection
    this.peerConnection = new RTCPeerConnection();

    // Setup track event to add incoming tracks to the remote stream
    this.peerConnection.ontrack = (event) => {
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
        this.remoteVideo.nativeElement.srcObject = this.remoteStream;
      }
      this.remoteStream.addTrack(event.track);
    };

    // Setup ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('candidate', event.candidate);
      }
    };

    // Join the live stream by emitting 'join-live'
    this.socket.emit('join-live');
  }

  stopViewing() {
    // Close the peer connection if it exists
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // Stop all tracks in the remote stream
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
      this.remoteStream = null;
    }

    // Reset the viewing status
    this.isViewing = false;
  }

  setupSocketListeners() {
    // Listen for the broadcaster's offer
    this.socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      if (!this.peerConnection) {
        console.error('Peer connection is undefined');
        return;
      }

      // Set remote description and create an answer
      try {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        // Emit the answer to the broadcaster
        this.socket.emit('answer', answer);
      } catch (error) {
        console.error('Error handling offer or creating answer:', error);
      }
    });

    // Listen for incoming ICE candidates from the broadcaster
    this.socket.on('candidate', (candidate: RTCIceCandidate) => {
      if (this.peerConnection) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(error => {
          console.error('Error adding received ICE candidate:', error);
        });
      } else {
        console.error('Peer connection is undefined');
      }
    });
  }
}
