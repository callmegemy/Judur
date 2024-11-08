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
  selectedFile: File | null = null;
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
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', [Validators.minLength(6)]],
      profilePicture: ['']
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.profileService.getProfile(userId).subscribe(
        (data) => {
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
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileForm.patchValue({ profilePicture: e.target.result });
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const userId = this.route.snapshot.paramMap.get('id');

    if (!userId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }

    const profileData = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      age: this.profileForm.value.age,
      phone: this.profileForm.value.phone,
      password: this.profileForm.value.password,
      profile_picture: this.profileForm.value.profilePicture
    };

    this.profileService.updateProfile(userId, profileData).subscribe(
      () => {
        this.router.navigate(['/view-profile']);
      },
      (error) => {
        if (error.status === 422 && error.error.errors?.email) {
          this.errorMessage = 'This email is already taken.';
        } else {
          this.errorMessage = 'Error updating profile.';
        }
        console.error('Error updating profile', error);
      }
    );
  }
}