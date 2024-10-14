import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  userName: string = 'Guest'; // Default value
  profileImage: string = 'assets/img/profile-picture.jpg'; // Default image
  
  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    try {
      const currentUser = this.authService.getUserData();
      if (currentUser && currentUser.id) {
        this.profileService.getProfile(currentUser.id).subscribe(
          (data: any) => {
            this.userName = data.user.name; // Retrieve the user's name
            this.profileImage = this.getProfilePictureUrl(data.user.profile_picture); // Get the profile image
          },
          error => {
            console.error('Error fetching profile data:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  getProfilePictureUrl(picture: string): string {
    // If there's no picture, use the default; otherwise, build the URL
    return picture ? `http://127.0.0.1:8000/storage/${picture}` : 'assets/img/profile-picture.jpg';
  }

  navigateToProfile() {
    // Navigate to the user's profile (if applicable)
    const currentUser = this.authService.getUserData();
    if (currentUser && currentUser.id) {
      // Replace this with your desired navigation logic
    }
  }
}
