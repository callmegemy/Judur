import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileService } from '../../services/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  userType: string = '';
  user: any = {};
  additionalInfo: any = {};

  errorMessage: string = ''; // Variable to hold any error messages
  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) {}
  ngOnInit() {
    try {
      // Get the logged-in user's data from the AuthService
      const currentUser = this.authService.getUserData();
  
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }
  
      const userId = currentUser.id; // Dynamically get the user's ID from the stored user data
      this.profileService.getProfile(userId).subscribe(
        data => {
          this.user = data.user;
          this.userType = data.type;
          this.additionalInfo = data.donor_info || data.volunteer_info;
          console.log('Profile data:', data);
        },
        error => {
          console.error('Error fetching profile:', error);
          this.errorMessage = 'Error fetching profile data.';
        }
      );
    } catch (error) {
      // Handle error with a type guard
      if (error instanceof Error) {
        console.error('Error in getting current user:', error);
        this.errorMessage = error.message; // Use the message from the Error object
      } else {
        console.error('Unexpected error:', error);
        this.errorMessage = 'An unexpected error occurred while getting user data.'; // Fallback message
      }
    }
  }
  
  navigateToEditProfile() {
    const userId = this.user.id; // Use the correct property to get the ID
    this.router.navigate(['/edit-profile', userId]); // Navigate with user ID
  }
}
