import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';  
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  imageError: string | null = null;
  itemName: string = '';
  quantity: number = 1;
  description: string = '';
  isValuable: boolean = false;
  itemCondition: string = '';
  estimatedValue: string = ''; 
  statusId: number = 1;
  extraNotes: string = '';  
  imageFile: File | null = null;
  backendErrors: { [key: string]: string[] } = {}; // Store errors for specific fields

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
    formData.append('quantity', this.quantity.toString());
    formData.append('description', this.description);
    formData.append('extra_notes', this.extraNotes); // Include extra notes

    if (this.isValuable) {
      formData.append('value', this.estimatedValue); 
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile); 
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
      'Authorization': `Bearer ${token}` // Corrected string interpolation
    });

    this.http.post('http://localhost:8000/api/donate-item', formData, { headers })
      .subscribe(
        (response: any) => {
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
        (error: any) => {
          console.error('Error donating item:', error);
          if (error.status === 422) {
            // Capture specific field errors
            this.backendErrors = error.error.errors;
            Swal.fire({
              icon: 'error',
              title: 'Validation Errors',
              text: 'Please check the form for errors.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Donation Failed',
              text: 'There was an error donating your item.',
            });
          }
        }
      );
  }

     // Method to handle file input
     onFileSelected(event: any) {
      const input = event.target as HTMLInputElement;
      if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB
    
        if (!validTypes.includes(file.type)) {
          this.imageError = 'Invalid file type. Please upload a JPEG, PNG, or GIF image.';
        } else if (file.size > maxSize) {
          this.imageError = 'File size exceeds the 2MB limit. Please upload a smaller file.';
        } else {
          this.imageFile = file;
        }
      }
    } 
}
