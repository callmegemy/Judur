import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landowner-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent], // Ensure ReactiveFormsModule is imported
  templateUrl: './landowner-registration.component.html',
  styleUrls: ['./landowner-registration.component.css']
})
export class LandownerRegistrationComponent {
  landDonationForm: FormGroup;
  selectedFile: File | null = null;
  user: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.landDonationForm = this.fb.group({
      description: ['', Validators.required],
      land_size: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      proof_of_ownership: [null, Validators.required],
      status_id: [1, Validators.required]
    });

    this.user = this.authService.getUserData();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.landDonationForm.patchValue({ proof_of_ownership: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.landDonationForm.invalid) {
      this.landDonationForm.markAllAsTouched();
      console.error('Form is invalid.');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.landDonationForm.get('description')?.value);
    formData.append('land_size', this.landDonationForm.get('land_size')?.value);
    formData.append('address', this.landDonationForm.get('address')?.value);
    formData.append('status_id', this.landDonationForm.get('status_id')?.value);

    if (this.selectedFile) {
      formData.append('proof_of_ownership', this.selectedFile, this.selectedFile.name);
    }

    this.authService.donateLand(formData).subscribe(
      (response: any) => {
        console.log('Land donated successfully!', response);
        window.alert('Land donated successfully!');
        this.landDonationForm.reset();
      },
      (error: any) => {
        console.error('Error donating land:', error);
        window.alert('An error occurred while donating land. Please try again.');
      }
    );
  }
}
