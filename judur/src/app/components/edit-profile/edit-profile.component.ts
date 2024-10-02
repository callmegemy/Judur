import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  userId: number=0; // Default ID
  errorMessage: string = '';

  constructor(private router: Router,private fb: FormBuilder, private profileService: ProfileService, private route: ActivatedRoute) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      console.log (this.userId ); // Get the user ID from the route parameter
      this.loadUserProfile(); // Load user profile with the retrieved user ID
    });
  }
  navigateToEdit() {
   
    this.router.navigate(['/edit-profile', this.userId]);
  }
  loadUserProfile(): void {
    this.profileService.getProfile(this.userId).subscribe(
      (response: any) => {
        this.profileForm.patchValue({
          name: response.user.name,
          email: response.user.email,
          profilePicture: null 
        });
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message || 'An error occurred while fetching profile data.';
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }



  onSubmit(): void {
    if (this.profileForm.invalid) {
     
      return ;
    }
  
    const formData = new FormData();
    formData.append('name', this.profileForm.get('name')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
  
    // if (this.selectedFile) {
    //   formData.append('profile_picture', this.selectedFile);
    // }
  
    this.profileService.updateProfile(this.userId, formData).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error?.error?.message || 'An error occurred while updating the profile.';
        console.error('Error updating profile', error);
      }
    );
  }
  
}
