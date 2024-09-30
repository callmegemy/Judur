import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landowner-registration',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './landowner-registration.component.html',
  styleUrls: ['./landowner-registration.component.css']
})
export class LandownerRegistrationComponent {
  landDonationForm: FormGroup;
  user: any; // Current logged-in user
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    // Initialize the form with validation
    this.landDonationForm = this.fb.group({
      description: ['', Validators.required],
      land_size: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      proof_of_ownership: [null, Validators.required],
      status_id: [1, Validators.required] // Default status
    });

    // Get the current logged-in user
    this.user = this.authService.getUserData();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      // Update the form control value to the selected file
      this.landDonationForm.patchValue({ proof_of_ownership: this.selectedFile });
    }
  }

  onSubmit(): void {
    console.log(this.landDonationForm.value); // Log the current form values
    if (this.landDonationForm.invalid) {
      console.error('Form is invalid.', this.landDonationForm.errors);
      return; // Handle invalid form
    }
  
    const formData = new FormData();
    formData.append('description', this.landDonationForm.get('description')?.value);
    formData.append('land_size', this.landDonationForm.get('land_size')?.value);
    formData.append('address', this.landDonationForm.get('address')?.value);
    formData.append('status_id', this.landDonationForm.get('status_id')?.value);
    
    // Append the selected file
    if (this.selectedFile) {
      formData.append('proof_of_ownership', this.selectedFile, this.selectedFile.name);
    }
    
    // Make API call to donate land
    this.authService.donateLand(formData).subscribe(
      (response: any) => {
        console.log('Land donated successfully!', response);
        // Show alert on successful donation
        window.alert('Land donated successfully!');
        // Optionally, reset the form or navigate to another page
        this.landDonationForm.reset(); // Reset the form after successful submission
      },
      (error: any) => {
        console.error('Error donating land:', error);
        window.alert('An error occurred while donating land. Please try again.'); // Show alert for errors
      }
    );
  }
  
}
