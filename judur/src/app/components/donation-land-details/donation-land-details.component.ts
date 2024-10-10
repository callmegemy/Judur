import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationService } from '../../services/donation.service';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-donation-land-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ReactiveFormsModule], 
  templateUrl: './donation-land-details.component.html',
  styleUrls: ['./donation-land-details.component.css']
})
export class DonationLandDetailsComponent implements OnInit {
  public currentDate = new Date(); // Make this public
  landDonations: any[] = [];
  errorMessage: string = '';
  redonateForm: FormGroup;
  selectedLandId: number | null = null;

  constructor(
    private donationService: DonationService,
    private router: Router,
    private fb: FormBuilder 
  ) {
    this.redonateForm = this.fb.group({
      availability_time: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.donationService.getLandDonations().subscribe((data) => {
      if (data && data.length > 0) {
        this.landDonations = data.map((donation: any) => { // Explicitly define type
          return {
            ...donation,
            availability_time: new Date(donation.availability_time) // Convert to Date object
          };
        });
      } else {
        this.errorMessage = 'No land donations found for the current donor.';
      }
    }, (error) => {
      this.errorMessage = 'Error fetching land donations';
      console.error('Error fetching land donations', error);
    });
  }

  openRedonateForm(landId: number): void {
    this.selectedLandId = landId;
    console.log('Redonate form opened for land ID:', landId);
  }

  redonateLand(): void {
    if (this.redonateForm.valid && this.selectedLandId !== null) {
      const availabilityData = this.redonateForm.value;
      this.donationService.updateLandAvailability(this.selectedLandId, availabilityData).subscribe(
        (response) => {
          console.log('Availability updated successfully:', response);
          this.ngOnInit(); 
        },
        (error) => {
          console.error('Error updating availability:', error);
        }
      );
    } else {
      console.log('Redonation form is invalid or no land selected');
    }
  }

  goBack(): void {
    this.router.navigate(['/donation-history']);
  }
}
