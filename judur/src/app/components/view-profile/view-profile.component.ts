import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileService } from '../../services/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-profile',
  standalone: true,  // Make this a standalone component
  imports: [
    RouterLink, 
    RouterLinkActive, 
    CommonModule, 
    NavbarComponent, 
    ReactiveFormsModule
  ],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']  // Ensure correct plural "styleUrls"
})
export class ViewProfileComponent {
  userType: string = '';
  user: any = {};
  additionalInfo: any = {};
  latestItemDonation: any = {};
  errorMessage: string = '';  // To hold any error messages

  constructor(
    private profileService: ProfileService, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    try {
      const currentUser = this.authService.getUserData();
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }
      const userId = currentUser.id;
      this.profileService.getProfile(userId).subscribe(
        data => {
          this.user = data.user;
          this.userType = data.type;
          this.additionalInfo = data.donor_info || data.volunteer_info;
          this.latestItemDonation = data.latest_item_donation;
        },
        error => {
          this.errorMessage = 'Error fetching profile data.';
        }
      );
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred while getting user data.';
    }
  }
  getProfilePictureUrl(picture: string): string {
  return picture ? `http://127.0.0.1:8000/storage/${picture}` : 'assets/img/profile-picture.jpg';
}


  navigateToEditProfile() {
    const userId = this.user.id;
    this.router.navigate(['/profile/edit', userId]);
  }
}
