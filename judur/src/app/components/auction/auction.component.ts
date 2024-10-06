import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';  
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction',
  standalone: true,  // Ensure the component is standalone
  imports: [FormsModule, CommonModule , NavbarComponent],  // Ensure necessary modules are imported
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  itemName: string = '';
  quantity: number = 1;
  description: string = '';
  isValuable: boolean = false;
  itemCondition: string = ''; 
  estimatedValue: string = ''; // Estimated value field
  statusId: number = 1; // Default status ID
  extraNotes: string = '';  
  imageFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: 'Please fill in all required fields'
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('item_name', this.itemName);
    formData.append('condition', this.itemCondition);
    formData.append('is_valuable', this.isValuable ? '1' : '0');
  
    if (this.isValuable) {
      formData.append('value', this.estimatedValue); // Send value if item is valuable
    }
  
    if (this.imageFile) {
      formData.append('image', this.imageFile); // Add the image file
    }
  
    const token = localStorage.getItem('auth_token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User not authenticated. Please log in.'
      });
      this.router.navigate(['/login']);
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.post('http://localhost:8000/api/donate-item', formData, { headers })
      .subscribe(
        (response) => {
          console.log('Item donation successful:', response);
          Swal.fire({
            icon: 'success',
            title: 'Donation Successful!',
            text: 'Your item has been donated successfully.',
            confirmButtonText: 'View Donations'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/donation-history']);
            }
          });
        },
        (error) => {
          console.error('Error donating item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Donation Failed',
            text: 'There was an error donating your item.',
          });
        }
      );
  }
  
  

  // Method to handle file input
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
}
