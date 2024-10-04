import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TopbarComponent } from '../dashboard/topbar/topbar.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, TopbarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
       age: ['', [Validators.required, Validators.min(1)]], // Ensure age is a positive number
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Assuming a 10-digit phone number
      // password: ['', [Validators.required, Validators.minLength(6)]], // Minimum 6 characters
  

    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
  
    if (userId) {
      this.profileService.getProfile(userId).subscribe(
        (data) => {
          // Populate the form with user data
          this.profileForm.patchValue(data.user);
        },
        (error) => {
          this.errorMessage = 'Error fetching profile data.';
          console.error('Error fetching profile data', error);
        }
      );
    } else {
      this.errorMessage = 'User ID is not available.';
    }
  }
  

  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.profileForm.patchValue({ profilePicture: file });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
  
    // Retrieve the user ID from the route
    const userId = this.route.snapshot.paramMap.get('id');
  
    if (!userId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }
  
    // Prepare the data to update
    const profileData = this.profileForm.value;
  
    this.profileService.updateProfile(userId, profileData).subscribe(
      () => {
        this.router.navigate(['/view-profile']);
      },
      (error) => {
        this.errorMessage = 'Error updating profile.';
      }
    );
  }
  
}
