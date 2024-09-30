import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landowner-registration',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule], 
  templateUrl: './landowner-registration.component.html',
  styleUrls: ['./landowner-registration.component.css']
})
export class LandownerRegistrationComponent {
  landDonationForm: FormGroup;
  user: any; 
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
   
    this.landDonationForm = this.fb.group({
      description: ['', Validators.required],
      land_size: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      proof_of_ownership: [null, Validators.required],
      status_id: [1, Validators.required]
    });

    // Get the current logged-in user
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
    console.log(this.landDonationForm.value); 
    if (this.landDonationForm.invalid) {
      console.error('Form is invalid.', this.landDonationForm.errors);
      return; 
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
